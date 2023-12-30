import { useState } from 'react'
import './Shortened.css'

export default function Shortened ({ link, shortLink }) {

    const [ copied, setCopied ] = useState(false);

    const copyLink = async () => {
        setCopied(true);
        navigator.clipboard.writeText(shortLink);
        await new Promise(resolve => setTimeout(resolve, 2000))
        setCopied(false);
    };

    return (
        <div className="shortened-box">
            <span>{ link }</span>

            <div className="shortened">
                <a href={`${shortLink}`}>{ shortLink }</a>
                {copied ? <button className='copied'>Copied !</button> : <button onClick={copyLink} className='copy'>Copy</button> }
            </div>
        </div>
    )
}