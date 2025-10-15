from django.db import models
import random


class Game(models.Model):
    name = models.CharField(max_length=250)
    turn = models.IntegerField(default=0)
    ended = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def start_game(self):
        self.turn = 1
        self.ended = False
        self.save()
        for player in self.players.all():
            player.reset()

    def current_player(self):
        players = list(self.players.all().order_by('id'))
        if not players:
            return None
        index = (self.turn - 1) % len(players)
        return players[index]

    def next_turn(self):
        players = list(self.players.all().order_by('id'))
        if not players:
            return

        active_players = [p for p in players if not p.stand and not p.busted]
        if not active_players:
            self.end_game()
            return

        self.turn = (self.turn % len(players)) + 1
        next_player = self.current_player()
        while next_player and (next_player.stand or next_player.busted):
            self.turn = (self.turn % len(players)) + 1
            next_player = self.current_player()

        if all(p.stand or p.busted for p in players):
            self.end_game()
        self.save()

    def end_game(self):
        self.ended = True
        self.save()

    def winners(self):
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
