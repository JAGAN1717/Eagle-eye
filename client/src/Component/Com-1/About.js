import React from "react";
import './about.css'


const About = () =>{


    return(
        <>
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                    <div className="cursor">  
                        </div>
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p>Log-out</p>
                        </div>
                        </div></div>
                                </div>
                                </nav>

<div className="container about-full">
  <div className="about-1">
    <div>
    <h2>OUR STORY</h2> <br></br>
      <i><p>
      Founded in 2010, By an ex-Microsoft 'techie' with no money but truckloads of relentless passion to make a difference in this world, Lenskart is India's fastest growing eyewear business today.
      </p></i>
      <i><p>
      With a rapidly growing business reaching out to over 1,00,000 customers a month via a unique combination of a strong online business as www.lenskart.com, uniquely designed physical stores,
       as well as a first of its kind 'home eye check up' service, Lenskart is revolutionizing the eyewear industry in India.
        </p></i>
      </div>
      <img src="https://static.lenskart.com/images/cust_mailer/16-dec/images/aboutus_03.gif"/>
  </div>
<hr></hr>
<div className="about-1">
<img src="https://static.lenskart.com/images/cust_mailer/16-dec/images/aboutus_06.gif"/>
<div>
    <i><p>
   <b>Cause :</b> 1/3rd of our population needs glasses but doesn't have access to them, 
    making us the blind capital of the world with over 15 million blind people.
    </p></i>
    <i><p>
    With the cause in mind,
    Peyush along with his two co-founders Amit Chaudhary and Sumeet Kapahi founded 'VALYOO technologies'.
    </p></i>
    <i><p>
    The aim was in truly add 'valyoo' in customers' lives by eliminating the retailers, setting up our own high quality manufacturing and supply directly to the consumer everywhere in India. This not only cuts costs,but also helps us maintain high quality standards. Our in house robotic lens manufacturing and assembling ensures 100% precision and top quality control.
    </p></i>
    <i><p>
    Offering the best quality products at affordable prices helped us grow more than 200% in the last 2 years and we are among the top 3 optical businesses in India today. From servicing 30 customers per day to more than 3000 today, we have came a long way. Our commitment to consumer satisfaction and innovative technologies has given us tremendous support from those who believe in our cause.
    </p></i>    
</div>
</div>
<hr></hr>
<div className="about-1">
    <div>
    <h2>OUR VISION</h2>
    <h6>India is the blind capital of the world.</h6>
    <i><p>15 million people in India are blind, which is 50% of the blind people of the world.</p></i>
    <i><p>75% of these are cases of avoidable blindness. Thanks to the country's acute shortage of optometrists and donated eyes for the treatment of corneal blindness.</p></i>
    <i><p>153 million people in the country need reading glasses but do not have access to them.</p></i>
    <i><p>Our country needs 40,000 optometrists. Unfortunately we only have 8,000.</p></i>
    <h6>Revolutionize the eyewear industry in India</h6>
    <i><p>Lenskart's aim is to help drop this number marginally in the coming years, which can be achieved by providing high quality eyewear to millions of Indians at affordable prices, giving free eye check ups at home and by extending our services to the remote corners of India.</p></i>
    </div>
    <img src="https://static.lenskart.com/images/cust_mailer/16-dec/images/aboutus_09.gif"/>
</div>
<hr></hr>
<div className="about-1">
    <img src="https://static.lenskart.com/images/cust_mailer/16-dec/images/aboutus_11.gif"/>
    <div>
        <h3>OUR MISSION</h3>
        <i><p>Wow customers by doing something that has never been done before in the eyewear industry. It began with an aim. An aim to provide every Indian access to high-quality designer glasses without shelling out their pocket. We rocked our brains. We broke our backs to come up with a plan that will not just change the way this industry works, but also will completely sweep customer off their feet. It can only be achieved if we provide.</p></i>
    </div>
</div>
<hr></hr>
<div className="about-1">
    <div>
        <h2>GREAT QUALITY</h2>
        <h6>Made by robots</h6>
        <i><p>We are India's first and the only brand to use robotic technique that delivers glasses which are accurate to 3 decimal places. These machines imported from Germany, ensure perfection on all front: an automated system that allows to inspect lenses, determine the geometric center, and load the lenses for edging without the need of a finishing block.</p></i>
        <h6>Mind of machine</h6>
        <i><p>Our people have zero tolerance to error and our call center aims to delight every customer, solve their problems and work on their feedbacks.</p></i>
    </div>
    <img src="https://static.lenskart.com/images/cust_mailer/16-dec/images/aboutus_14.gif"/>
</div>
<hr></hr>
<div className="about-1">
      
        <img src="https://static.lenskart.com/images/cust_mailer/16-dec/images/aboutus_24_03.gif"/>
        
    <div>
        <h6>At your doorstep</h6>
        <i><p>When we say we are never too far, we mean it. Give us a call or register online, we will be at your doorstep for home eye check-up. International quality, computerized equipment, certified ruefractionists, we have it all to give you the best home eye check-up experience. No obligations to buy.</p></i>
        <h6>Try Frames @ Home</h6>
        <i><p>Our eyewear specialist carrying 100 bestselling frames will visit you for home trial. You can try the frames on yourself, choose your favourite and make a purchase with the prescription online/on the phone via our trial executive.</p></i>
    </div>
</div>
<hr></hr>
<h3>TRUST</h3>
<div className="about-1">
    <div>
    <h3>14 day refund</h3>
    <i><p>All our product, including prescription lenses come with a 'no question ask' 14 days return policy.</p></i>
    </div>
    <div>
    <h3>14 day refund</h3>
    <i><p>All our product, including prescription lenses come with a 'no question ask' 14 days return policy.</p></i>
    </div>
    <div>
    <h3>Authenticity card</h3>
    <i><p>With every frame or contact lenses, we provide authenticity card as a proof of quality and authenticity.</p></i>
    </div>
</div>
<hr></hr>
</div>

<div className="footer">
        <i><h4>Buy The Best Eyewear From Eagle-Eye</h4></i>
        <p>A one-stop online solution for purchasing eyewear and its accessories, Lenskart delivers them right at your doorstep with convenient methods of payment. Sunglasses as well as eyeglasses are available for men and women in a diverse array of styles and trendy colours. If you want to try out contact lenses, pick the ones of your choice from the extensive variety of coloured contact lenses from our online store.</p>
            <div className="foot">
                <div className="cont">
                <b><span>Service</span></b>
                <ul>
                    <li>Store Locator</li>
                    <li>Enter My Power</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>About Us</span></b>
                <ul>
                    <li>We Are Hiring</li>
                    <li>Refer & Earn</li>
                    <li>About Us</li>
                    <li>Coupons</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Help</span></b>
                <ul>
                    <li>FAQ's</li>
                    <li>Site Map</li>
                    <li>Payments</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Social</span></b>
                <ul>
                    <li>Facebooke</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
                </div>
                <div className="cont">
                    
                <img src="https://headstrongperformance.net/wp-content/uploads/2016/04/get-it-on-google-play-vector.png"  />
                <img src="https://miro.medium.com/max/600/1*xqT83bMEz92IBYxS9UQNow.png"/>
                <p>Download Eyekart App to buy EyeGlasses </p>
                 </div>

            </div>
            <hr></hr>
            <span>2022 & 2023</span>
        </div>

        </>
    )
}


export default About