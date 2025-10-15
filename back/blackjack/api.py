# api.py
from ninja import NinjaAPI
from django.shortcuts import get_object_or_404
from ../game_manager/models import Game, Player
from pydantic import BaseModel
from typing import List, Optional

api = NinjaAPI()

# --- Pydantic Schemas for frontend ---
class PlayerSchema(BaseModel):
    id: int
    name: str
    score: int
    busted: bool
    stand: bool

class GameSchema(BaseModel):
    id: int
    name: str
    turn: int
    ended: bool
    players: List[PlayerSchema]

class RollResponse(BaseModel):
    player: PlayerSchema
    rolls: Optional[List[int]]  # None if invalid move
    message: str

class StartGameRequest(BaseModel):
    name: str
    player_names: List[str]


# --- Endpoint to start a game ---
@api.post("/start", response=GameSchema)
def start_game(request, data: StartGameRequest):
    game = Game.objects.create(name=data.name)
    for name in data.player_names:
        Player.objects.create(name=name, game=game)
    game.start_game()
    return serialize_game(game)


# --- Endpoint to play/roll dice ---
@api.post("/play/{dels}", response=RollResponse)
def play_turn(request, dels: int):
    # Clamp dice between 1-3
    dels = max(1, min(3, dels))
    
    # Find active game(s) with players still playing
    active_games = Game.objects.filter(ended=False)
    if not active_games.exists():
        return {"player": None, "rolls": None, "message": "No active game."}
    
    game = active_games.first()
    player = game.current_player()
    if not player:
        return {"player": None, "rolls": None, "message": "No current player."}
    
    if player.stand or player.busted:
        return {"player": serialize_player(player), "rolls": None, "message": "Player cannot roll."}

    rolls = player.roll_dice(dels=dels)
    
    # Move to next turn
    game.next_turn()
    
    return {"player": serialize_player(player), "rolls": rolls, "message": f"{player.name} rolled {rolls}"}


# --- Endpoint to get game state ---
@api.get("/get/{game_id}", response=GameSchema)
def get_game(request, game_id: int):
    game = get_object_or_404(Game, id=game_id)
    return serialize_game(game)


# --- Helper functions ---
def serialize_player(player: Player) -> PlayerSchema:
    return PlayerSchema(
        id=player.id,
        name=player.name,
        score=player.score,
        busted=player.busted,
        stand=player.stand
    )

def serialize_game(game: Game) -> GameSchema:
    return GameSchema(
        id=game.id,
        name=game.name,
        turn=game.turn,
        ended=game.ended,
        players=[serialize_player(p) for p in game.players.all().order_by("id")]
    )
