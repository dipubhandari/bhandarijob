import './Footer.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaTiktok, FaYoutube, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
    return (


                <div className="footer">
                    <div className="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#">Mahendranagar-9 Kanchanpur</a></li>
                            <li><a href="#">Owner Dipu Bhandari</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">affiliate program</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">shipping</a></li>
                            <li><a href="#">returns</a></li>
                            <li><a href="#">order status</a></li>
                            <li><a href="#">payment options</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4> shop now</h4>
                        <ul>
                            <li><a href="#">watch</a></li>
                            <li><a href="#">bag</a></li>
                            <li><a href="#">shoes</a></li>
                            <li><a href="#">dress</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"><FaFacebookSquare /></i></a>
                            <a href="#"><i className="fab fa-twitter"><FaTiktok /></i></a>
                            <a href="#"><i className="fab fa-instagram"><FaYoutube/></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"><FaLinkedinIn/></i></a>
                        </div>
                    </div>
                </div>
         

    )
}

export default Footer