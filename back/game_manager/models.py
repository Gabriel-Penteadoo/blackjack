from django.db import models
import random


class Game(models.Model):
    name = models.CharField(max_length=250)
    turn = models.IntegerField(default=0)
    turn_count = models.IntegerField(default=1)
    ended = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def start_game(self):
        self.turn = 1
        self.ended = False
        self.save()
        self.players.update(score=0, busted=False, stand=False)

    def current_player(self):
        return self.players.order_by('id')[self.turn - 1] if self.players.exists() else None

    def next_turn(self):
        """Advance to the next active player, or end the game if none remain."""
        players = self.players.order_by('id')
        total_players = players.count()
        if total_players == 0:
            return

        # Players still in game
        active_players = players.filter(busted=False, stand=False)
        if not active_players.exists():
            self.end_game()
            return

        # Increment turn number cyclically
        self.turn = (self.turn % total_players) + 1

        # Find next valid player directly using ORM
        for _ in range(total_players):  # prevent infinite loop
            next_player = players[self.turn - 1]
            if not next_player.busted and not next_player.stand:
                break
            self.turn = (self.turn % total_players) + 1

        # Check if everyone is done
        if not players.filter(busted=False, stand=False).exists():
            self.end_game()
        else:
            # New round when looping back to first player
            if self.turn == 1:
                self.turn_count += 1

        self.save()

    def end_game(self):
        self.ended = True
        self.save()

    def winners(self):
        """Return all players with the highest valid score (<= 21)."""
        valid_players = self.players.filter(score__lte=21)
        if not valid_players.exists():
            return []
        max_score = valid_players.aggregate(models.Max('score'))['score__max']
        return valid_players.filter(score=max_score)


class Player(models.Model):
    name = models.CharField(max_length=50)
    score = models.IntegerField(default=0)
    busted = models.BooleanField(default=False)
    stand = models.BooleanField(default=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='players')

    def __str__(self):
        return f"{self.name} (Game: {self.game.name}, Score: {self.score})"

    def roll_dice(self, dels = 1):
        if self.stand or self.busted or self.game.ended:
            return None

        dels = max(1, min(3, dels))  # Forces dels to be between 1 to 3
        rolls = [random.randint(1, 6) for _ in range(dels)]
        self.score += sum(rolls)
        if self.score > 21:     # Max score is 21
            self.busted = True
        elif self.score == 21:
            self.stand = True
        self.save()
        return rolls

    def hold(self):
        self.stand = True
        self.save()

    def reset(self):
        self.score = 0
        self.busted = False
        self.stand = False
        self.save()
