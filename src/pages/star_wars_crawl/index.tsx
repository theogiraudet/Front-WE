import {useEffect, useRef, useState} from "react";
import {Power2, Power1} from 'gsap'
import gsap from 'gsap';
import {useLocation} from "react-router";
import {MusicSW} from "pages/star_wars_crawl/music";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// https://medium.com/dev-red/tutorial-animate-the-opening-star-wars-crawl-in-a-react-app-with-greensock-bc55a5d05d24
export const StarWarsCrawl: React.FC = () => {
    require('./Crawl.css')
    const query = useQuery()
    const episode = query.get('episode')
    const title = query.get('title')
    const introTable: Array<any> = []
    query.get('intro')!.split("\\n").map((text, i) => i > 0 ? introTable.push(<br/>, text): introTable.push(text))
    const textP = query.get('text')?.split("\\r\\n\\r\\n").map(text => text.replaceAll("\\r\\n", " ")) || []

    const ref = useRef<HTMLElement>(null)
    const refCrawl = useRef<HTMLDivElement>(null)
    const refLogo = useRef(null)
    const refAudio = useRef<HTMLAudioElement>(null)

    const timeLine = gsap.timeline()

    useEffect(() => {
        document.getElementById("root")!.className = 'star_wars_root'
        document.documentElement.className = "star_wars_html"
        document.body.className = 'star_wars_body'
        return () => {
            document.body.className = ''
            document.getElementById("root")!.className = ''
            document.documentElement.className = ''
        }
    });

    useEffect(() => {
        timeLine.to(ref.current, {opacity: 1, duration: 4.5, delay: 1})
                .to(ref.current, {opacity: 0, duration: 1.5, onComplete:
                        () => {
                            refAudio.current!.play();
                        }
                })
                .set(refLogo.current, {
                    opacity: 1,
                    scale: 2.75,
                    delay: 0.5
                })
                .to(refLogo.current, { scale: 0.05, duration: 8, ease: Power2.easeOut })
                .to(refLogo.current, {duration: 1.5, opacity: 0 }, "-=1.5")
                .to(refCrawl.current, { duration: 200, top: "-170%" })
                .to(refCrawl.current, {duration: 10, opacity: 0})
        }
    )

    return (
        <>
            <div className="star_wars_container">
                <section className="star_wars_intro" ref={ref}>
                    <p className="star_wars_p">
                        {introTable}
                    </p>
                </section>
                <section className="star_wars_logo" ref={refLogo}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Star_Wars_Yellow_Logo.svg" alt="Code Wars logo" />
                </section>
                <section className="star_wars_crawl">
                    <div className="star_wars_content" ref={refCrawl}>
                        <h1 className="star_wars_h1">{episode}</h1>
                        <h2 className="star_wars_h2">{title}</h2>
                        {textP.map((text, i) => ( <p key={i} className="star_wars_p">{text}</p> ))}
                    </div>
                </section>
                <MusicSW refAudio={refAudio}/>
            </div>
        </>
    )
}
