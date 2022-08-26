import React from "react";
import '../footer/footer.css'
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
const Footer = () => {
    return (
        <div className='bg-dark text-light'>
            <div className='my-auto p-4'>

                <span>
                    <label>Enter your Name :  </label>
                    <input type="Name" name="" id="" placeholder=" Name" />
                </span>
                <div className="text">
                <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br/>
                     Natus modi corporis ipsum praesentium maxime, quasi ullam 
                     numquam tempora, dolore vel perferendis consequuntur<br/>
                      excepturi magnam officiis iste dolor ipsam
                       reprehenderit sunt.
                </span>
                </div>

               <div className="phone">
               <i >  <PhoneIcon /> : +91-6396836300</i>
               </div>
               <div className="mail">
               <i><MailIcon/>: arun8840kumar@gmail.com </i>
               </div>
            </div>
        </div>
    );
};

export default Footer;