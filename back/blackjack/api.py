from ninja import NinjaAPI
from django.shortcuts import get_object_or_404
from game_manager.models import Game, Player
from pydantic import BaseModel
from typing import List, Optional

api = NinjaAPI()

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
    turn_count: int
    ended: bool
    current_player: Optional[str] = None
    players: List[PlayerSchema]
    winners: Optional[List[PlayerSchema]] = None

class RollResponse(BaseModel):
    player: PlayerSchema
    rolls: Optional[List[int]]
    message: str

class StartGameRequest(BaseModel):
    name: str
    player_names: List[str]


@api.post("/start", response=GameSchema)
def start_game(request, data: StartGameRequest):
    game = Game.objects.create(name=data.name)
    for name in data.player_names:
        Player.objects.create(name=name, game=game)
    game.start_game()
    return serialize_game(game)


@api.post("/play/{dels}", response=GameSchema)
def play_turn(request, dels: int, game_id: int):
    game = get_object_or_404(Game, id=game_id)
    player = game.current_player()
    if not player:
        raise Exception("No current player")

    if dels == 0:
        player.hold()
    else:
        dels = max(1, min(3, dels))
        player.roll_dice(dels=dels)

    game.next_turn()
    return serialize_game(game)


@api.get("/get/{game_id}", response=GameSchema)
def get_game(request, game_id: int):
    game = get_object_or_404(Game, id=game_id)
    return serialize_game(game)


def serialize_player(player: Player) -> PlayerSchema:
    return PlayerSchema(
        id=player.id,
        name=player.name,
        score=player.score,
        busted=player.busted,
        stand=player.stand
    )

def serialize_game(game: Game) -> GameSchema:
    current_player = game.current_player()  # <-- define it here

    return GameSchema(
        id=game.id,
        name=game.name,
        turn=game.turn,
        turn_count=game.turn_count,
        ended=game.ended,
        current_player=current_player.name if current_player else None,
        players=[serialize_player(p) for p in game.players.all().order_by("id")],
        winners=[serialize_player(p) for p in game.winners()] if game.ended else None
    )

