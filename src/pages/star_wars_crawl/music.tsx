import React, {RefObject, useState} from "react";

type Props = {
    refAudio: RefObject<HTMLAudioElement>
}
/**
 * Composant représentant la gestion de la musique sur la page Star Wars Crawl
 * Ce composant a été séparé du reste pour ne pas rerendre toute la page (et donc faire buguer l'animation) lors
 * du changement d'état de ce composant à la désactivation de la musique.
 * Ainsi, seul se composant sera rerendu à la désactivation/réactivation de la musique
 * @param refAudio la référence vers le composant audio
 */
export const MusicSW: React.FC<Props> = ({
        refAudio
    }) => {

    // État de la musique (mutée ou non)
    const [musicState, setState] = useState<Boolean>(false)

    // Au clic sur l'icône de volume, on inverse l'état de la musique et on actualise l'icône
    const onVolumeClick = () => {
        if(musicState)
            refAudio.current!.muted = false
        else
            refAudio.current!.muted = true

        setState(!musicState)
    }

    return (
        <>
            <audio controls ref={refAudio}>
                <source
                    type="audio/mpeg"
                    src="https://dl.dropbox.com/s/e1ez874i5024eyb/star-wars-theme-shitty-flute-version.mp3"
                />
            </audio>
            <button className="star_wars_volume" type="button" onClick={onVolumeClick}>
                {/* Icons created by Agarunov Oktay-Abraham from the Noun Project */}
                {/* https://thenounproject.com/agarunov/ */}
                {musicState ? (
                    <img src="https://raw.githubusercontent.com/redacademy/star-wars-crawl-greensock/6903b9ba84e4f4140f37de304c2c9c589a3aa6ce/src/volume_off.svg" alt="Volume is off" />
                ) : (
                    <img src="https://raw.githubusercontent.com/redacademy/star-wars-crawl-greensock/6903b9ba84e4f4140f37de304c2c9c589a3aa6ce/src/volume_on.svg" alt="Volume is on" />
                )}
            </button>
        </>
    )
}
