# game_manager/tests.py
from django.test import TestCase
from .models import Game, Player

class GameModelTest(TestCase):

    def setUp(self):
        # Create a game instance
        self.game = Game.objects.create(name="Test Game")
        # Create two players
        self.player1 = Player.objects.create(name="Alice", game=self.game)
        self.player2 = Player.objects.create(name="Bob", game=self.game)

    def test_game_creation(self):
        """Test that the game is created correctly"""
        self.assertEqual(self.game.name, "Test Game")
        self.assertEqual(self.game.turn, 0)
        self.assertFalse(self.game.ended)

    def test_start_game_method(self):
        """Test that start_game() works"""
        self.game.start_game()
        self.game.refresh_from_db()
        self.assertEqual(self.game.turn, 1)
        self.assertFalse(self.game.ended)

    def test_get_game_classmethod(self):
        """Test the get_game() class method"""
        game = Game.get_game(self.game.id)
        self.assertEqual(game, self.game)

    def test_player_creation(self):
        """Test player creation and relation to game"""
        self.assertEqual(self.player1.game, self.game)
        self.assertEqual(self.player2.game, self.game)
        self.assertFalse(self.player1.stand)
        self.assertEqual(self.player1.score, 0)

    def test_players_related_name(self):
        """Test reverse relation from Game to Players"""
        players = self.game.players.all()  # Using related_name
        self.assertEqual(players.count(), 2)
        self.assertIn(self.player1, players)
        self.assertIn(self.player2, players)
