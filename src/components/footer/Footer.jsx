import React from 'react';
import Link from 'next/link'
import { Facebook  } from "@material-ui/icons";

import styles from './footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer__main}>
            <div className={styles.social__links}>
                <Facebook />
            </div>
            <table>
                <thead>
                    <tr>
                    <td>Audio and subtitles</td>
                    <td>Self description</td>
                    <td>Gift cards</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Press </td>
                    <td >Investments relationships </td>
                    <td>User conditions</td>

                    </tr>
                    <tr>
                    <td>Privacy</td>
                    <td>Global informations</td>     
                    <td>Legal mentions</td>

                    </tr>
                    <tr>
                    <td>Contact us</td>
                    </tr>
                </tbody>
            </table>
            <button className={styles.button}>Service code</button>
        </div>
    );
}

export default Footer;
