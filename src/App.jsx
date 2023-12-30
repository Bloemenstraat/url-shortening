import { useState } from 'react'
import Logo from './assets/logo.svg'
import Hero from './assets/illustration-working.svg'
import IconBrand from './assets/icon-brand-recognition.svg'
import IconRecords from './assets/icon-detailed-records.svg'
import IconCustom from './assets/icon-fully-customizable.svg'
import Pinterest from './assets/icon-pinterest.svg'
import Instagram from './assets/icon-instagram.svg'
import Facebook from './assets/icon-facebook.svg'
import Twitter from './assets/icon-twitter.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import './Mobile.css'
import Shortened from './components/Shortened'
import axios from 'axios'

function App() {

    const [ error, setError ] = useState(false);
    const [ link, setLink ] = useState('');
    const [ linkList, setLinkList ] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);

    const shortenLink = async () => {

        if (link == '' || !link.match(/^https?:\/\/(.+)\.(.+)$/i)) {
            setError(true);
            return;
        }

        setIsLoading(true);

        try {
            let response = await axios.post('http://localhost:5173/api/v1/shorten', {
                
                url: link
            });
            setLinkList([{ link: link, shortLink: response.data.result_url }, ...linkList]);
            setLink('');
            setError(false);
            setIsLoading(false);
        } catch (e) {
            setError(true);
            setIsLoading(false);
        } 
    }

    return (
        <>
            {/*<nav>
                <div className="left">
                    <img src={Logo} />
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">Resources</a>
                </div>
                <div className="right">
                    <a href="#">Login</a>
                    <button>Sign Up</button>
                </div>
            </nav>*/}

            <nav>
                <div className="mobile-bar">
                    <img src={Logo} />                    
                    <label for="check">
                        <FontAwesomeIcon icon={faBars} size="2x" />
                    </label>
                </div>

                <input type="checkbox" id="check" />

                <div className="nav-links">
                    <div className="left">    
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                        <a href="#">Resources</a>
                    </div>
                    <div className="right">
                        <a href="#">Login</a>
                        <button>Sign Up</button>
                    </div>
                </div>
            </nav>

            <div className="hero">
                <div className="left">
                    <h1>More than just shorter links</h1>
                    <p>Build your brand's recognition and get detailed insights on how your links are performing.</p>
                    <button>Get Started</button>
                </div>

                <img src={Hero} />
            </div>

            <div className="shortening-section">
                <div className={error ? "shortening-box error-message" : "shortening-box"}>
                    <input className={error ? 'error' : 'normal'} value={link} onChange={(e) => setLink(e.target.value)} placeholder='Shorten a link here...' />
                    <button onClick={shortenLink} disabled={isLoading} >Shorten it!</button>
                </div>

                {linkList.map((e, i) => <Shortened link={e.link} shortLink={e.shortLink} key={i} />)}
                
            </div>

            <div className="statistics-section">
                <div className="statistics-text">
                    <h2>Advanced Statistics</h2>
                    <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
                </div>
                <div className="statistic-cards">
                    <div className="backline"></div>

                    <div className="stat-card">
                        <img src={IconBrand} />
                        <h4>Brand Recognition</h4>
                        <p>
                            Boost your brand recognition with each click. Generic links don’t 
                            mean a thing. Branded links help instil confidence in your content.
                        </p>
                    </div>
                    <div className="stat-card">
                        <img src={IconRecords} />
                        <h4>Detailed Records</h4>
                        <p>
                            Gain insights into who is clicking your links. Knowing when and where 
                            people engage with your content helps inform better decisions.
                        </p>
                    </div>
                    <div className="stat-card">
                        <img src={IconCustom} />
                        <h4>Fully Customizable</h4>
                        <p>
                            Improve brand awareness and content discoverability through customizable 
                            links, supercharging audience engagement.
                        </p>
                    </div>

                </div>
            </div>

            <div className="boost">
                <h2>Boost your links today</h2>
                <button>Get Started</button>
            </div>

            <footer>
                <img src={Logo} />

                <div className="footer-space"></div>

                <div className="footer-links">
                    <h6>Features</h6>
                    <a href="#">Link Shortening</a>
                    <a href="#">Branded Links</a>
                    <a href="#">Analytics</a>
                </div>
                <div className="footer-links">
                    <h6>Resources</h6>
                    <a href="#">Blog</a>
                    <a href="#">Developers</a>
                    <a href="#">Support</a>
                </div>
                <div className="footer-links">
                    <h6>Company</h6>
                    <a href="#">About</a>
                    <a href="#">Our Team</a>
                    <a href="#">Careers</a>
                    <a href="#">Contact</a>
                </div>

                <div className="footer-socials">
                    <a href="https://www.facebook.com/"><img src={Facebook} /></a>
                    <a href="https://www.twitter.com/"><img src={Twitter} /></a>
                    <a href="https://www.pinterest.com/"><img src={Pinterest} /></a>
                    <a href="https://www.instagram.com/"><img src={Instagram} /></a>
                </div>
            </footer>

        </>
    )
}

export default App
