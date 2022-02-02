import React from 'react';
import { Facebook, Instagram, Twitter, YouTube  } from "@material-ui/icons";

import styles from './footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer__main}>
            <div className={styles.social__links}>
                <Facebook className={styles.icon}/>
                <Instagram className={styles.icon}/>
                <Twitter className={styles.icon}/>
                <YouTube className={styles.icon}/>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td><a>Audio and subtitles</a></td>
                        <td><a>Self description</a></td>
                        <td><a>Gift cards</a></td>
                    </tr>
                    <tr>
                        <td><a>Press</a> </td>
                        <td ><a>Investments relationships</a> </td>
                        <td><a>User conditions</a></td>
                    </tr>
                    <tr>
                        <td><a>Privacy</a></td>
                        <td><a>Global informations</a></td>     
                        <td><a>Legal mentions</a></td>
                    </tr>
                    <tr>
                        <td><a>Contact us</a></td>
                    </tr>
                    <tr>
                        <td>
                            <button className={styles.button}>Service code</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Footer;
