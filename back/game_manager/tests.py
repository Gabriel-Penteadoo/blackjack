from django.test import TestCase
from .models import Game, Player


class DiceJackTestCase(TestCase):

    def setUp(self):
        self.game = Game.objects.create(name="Test Game")
        self.p1 = Player.objects.create(name="Alice", game=self.game)
        self.p2 = Player.objects.create(name="Bob", game=self.game)

    def test_start_game_resets_players(self):
        self.p1.score = 15
        self.p1.busted = True
        self.p1.save()

        self.game.start_game()

        self.p1.refresh_from_db()
        self.assertEqual(self.p1.score, 0)
        self.assertFalse(self.p1.busted)
        self.assertFalse(self.p1.stand)
        self.assertEqual(self.game.turn, 1)
        self.assertFalse(self.game.ended)

    def test_current_player_returns_first_player(self):
        self.game.start_game()
        player = self.game.current_player()
        self.assertEqual(player, self.p1)

    def test_next_turn_switches_players(self):
        self.game.start_game()
        self.assertEqual(self.game.current_player(), self.p1)

        self.game.next_turn()
        self.assertEqual(self.game.current_player(), self.p2)

    def test_player_roll_dice_increases_score(self):
        self.game.start_game()
        old_score = self.p1.score
        roll = self.p1.roll_dice()
        self.p1.refresh_from_db()
        self.assertTrue(1 <= roll <= 6)
        self.assertEqual(self.p1.score, old_score + roll)

    def test_player_can_bust(self):
        self.p1.score = 20
        self.p1.save()
        self.p1.roll_dice()
        self.p1.refresh_from_db()
        if self.p1.score > 21:
            self.assertTrue(self.p1.busted)

    def test_player_hold_sets_stand_true(self):
        self.p1.hold()
        self.p1.refresh_from_db()
        self.assertTrue(self.p1.stand)

    def test_busted_or_standing_players_are_skipped(self):
        self.game.start_game()
        self.p1.busted = True
        self.p1.save()
        self.game.next_turn()
        self.assertEqual(self.game.current_player(), self.p2)

    def test_end_game_sets_flag(self):
        self.game.start_game()
        self.game.end_game()
        self.assertTrue(self.game.ended)

    def test_winners_returns_highest_score_below_or_equal_21(self):
        self.p1.score = 18
        self.p2.score = 21
        self.p1.save()
        self.p2.save()
        winners = self.game.winners()
        self.assertIn(self.p2, winners)
        self.assertNotIn(self.p1, winners)

    def test_winners_empty_if_all_busted(self):
        self.p1.score = 22
        self.p2.score = 24
        self.p1.save()
        self.p2.save()
        self.assertEqual(list(self.game.winners()), [])
