from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=250)
    turn = models.IntegerField(default=0)
    ended = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    # Exemple de méthode personnalisée
    def start_game(self):
        """Démarre la partie"""
        self.turn = 1
        self.ended = False
        self.save()

    @classmethod
    def get_game(cls, game_id):
        """Retourne une partie spécifique par ID"""
        return cls.objects.filter(id=game_id).first()


class Player(models.Model):
    name = models.CharField(max_length=50)
    score = models.IntegerField(default=0)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='players')
    stand = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} (Game: {self.game.name})"
