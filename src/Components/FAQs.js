import React from "react";
import { Paper } from "@mui/material";
import "../Styles/faq.css";

const FAQs = () =>{
    return(
      <Paper elevation={24} sx={{mt:"20px",mr:"20px", ml:"20px",mb:"20px",p:"40px"}}>
      <h1>FAQs</h1> 
      <p> Australia's Exclusive Marketplace for New & Authentic Streetwear is Smart Sneaker Head. In order for our clients to never miss a drop, we constantly supply the newest and most well-liked brands and items. </p>
      <hr></hr>
      <br></br>

      <h2 class="faq-header"> Are all the sneakers authentic? </h2> 
      <p class="ex1">Our website offers a 100% authenticity guarantee for all our sneakers. We don't provide any imitations or unauthorised products for sale.
      Before being placed online, each item is thoroughly examined by our experts to make sure it is both brand-new and defect-free. Smart Sneaker Head will initiate a full refund right away and will bear all associated fees if a consumer discovers that an item is not real.
      </p>

      <h2 class="faq-header">What payment methods are accepted?</h2>  
      <p class="ex1">Smart Sneaker Head accepts Debit or Credit Card payments.</p> 
      
      <h2 class="faq-header"> What is the status of my order?</h2> 
      <p class="ex1">From the moment your order is placed, we require the typical processing time shown in the item description (excluding weekends and holidays). Once your order has been sent, an email with a tracking number will be sent to you. If you have not received any delivery or confirmation emails, please check any promotional or junk inboxes.
      </p>
      
      <h2 class="faq-header"> Can I cancel my order? </h2> 
      <p class="ex1">Unfortunately, once your order has been placed, it is impossible to change or cancel any of its specifics. The number of items, the shipment address, and the payment and shipping methods cannot be altered. Please check that all the information is entered correctly.
      </p>

      <h2 class="faq-header">Do you deliver internationally and from what location? </h2> 
      <p class="ex1">We provide shipping services to the majority of international destinations, and all purchases are dispatched from our Australian warehouse.
      </p>    
      <h2 class="faq-header"> How long is shipping? </h2> 
         <h4 class="faq-header"> Local Shipping (Australia)</h4>
         <p class="ex2">The Standard Shipping delivery window is 2 to 5 business days.</p>
         <p class="ex2">The Express Shipping delivery window is between one and three business days.</p>
         <h4 class="faq-header"> Worldwide Shipping </h4>
         <p class="ex2">The Standard Shipping delivery window is 7 to 15 business days.</p>
         <p class="ex2">Express Shipping is anticipated to take 5 to 9 business days to deliver.</p>
      </Paper>
    )
}


export default FAQs;
