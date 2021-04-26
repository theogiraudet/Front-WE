import {Ref, RefObject, useState} from "react";

type Props = {
    refAudio: RefObject<HTMLAudioElement>
}

export const MusicSW: React.FC<Props> = ({
        refAudio
    }) => {

    const [musicState, setState] = useState<Boolean>(false)

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
