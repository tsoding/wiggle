module Main exposing (main)

import Browser exposing (..)
import Browser.Events exposing (onAnimationFrameDelta)
import Collage exposing (..)
import Collage.Layout exposing (..)
import Collage.Render exposing (..)
import Color exposing (..)
import Html exposing (Html, text, img, div, node)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Time
import Task
import Process

type Msg = Wiggle | Reset

type alias Model = { tenticleClass : String }

init : () -> (Model, Cmd Msg)
init _ = ({ tenticleClass = "nothing" }, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions _ = Sub.none

-- TODO: animation could not be activated through a REST API call
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Wiggle -> ({model | tenticleClass = "wiggle"}, Cmd.none)
        Reset -> ( {model | tenticleClass = "none"}
                 , Task.perform (always Wiggle) (Process.sleep 10)
                 )

tenticleBoi : Model -> Html Msg
tenticleBoi model =
    let stylesheet = node "link" [ attribute "rel" "stylesheet"
                                 , attribute "property" "stylesheet"
                                 , attribute "href" "style.css"
                                 ] []
    -- TODO: Composition of head and tenticle doesn't look right
    in div [] [ img [ src "Octocat-Tenticle.png"
                    , class model.tenticleClass
                    , onClick Reset
                    ]
                    []
              , img [ src "outlined-avatar.svg.png" ]
                    []
              , stylesheet
              ]

main : Program () Model Msg
main =
  Browser.element
      { init = init
      , update = update
      , subscriptions = subscriptions
      , view = tenticleBoi
      }
