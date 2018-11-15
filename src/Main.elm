module Sierpinski exposing (main)

import Browser exposing (..)
import Browser.Events exposing (onAnimationFrameDelta)
import Collage exposing (..)
import Collage.Layout exposing (..)
import Collage.Render exposing (..)
import Color exposing (..)
import Html exposing (Html)

type alias Model = Float

type Msg = Wiggle Float

init : () -> (Model, Cmd Msg)
init _ = (0.0, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions _ =
    onAnimationFrameDelta Wiggle

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Wiggle deltaTime -> (model + 0.1, Cmd.none)
         
tenticleBoi : Model -> Html msg
tenticleBoi angle =
    stack [ horizontal [ spacer 100 500
                       , image (500, 500) "outlined-avatar.svg.png"
                       ]
          , image (500, 500) "Octocat-Tenticle.png" |> rotate (angle |> sin |> abs)
          ] |> svg

main : Program () Model Msg
main =
  Browser.element
      { init = init
      , update = update
      , subscriptions = subscriptions
      , view = tenticleBoi
      }
