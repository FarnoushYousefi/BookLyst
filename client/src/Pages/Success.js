import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';

export default function Success() {   
  const [redirctTo, setRedirctTo] = useState(false);
  const [ addDonation, { error }] = useMutation(ADD_DONATION);

  useEffect(() => {
    /*(async () => {
      const amount = localStorage.getItem('donationAmount');

      try {
        const response = await addDonation({
          variables: { donationData: {amount: amount, session: "abcdefg"} }
        });
        console.log(response)
      } catch (e) {
        console.error(e);
      }

      setTimeout(() => {
        setRedirctTo(true);
      }, 3000);
    })();
  });*/
  const renderDonation = async () => {
    const amount = localStorage.getItem('donationAmount');
    let params = (new URL(document.location)).searchParams;
    let session = params.get('session_id');
    //console.log(amount, session)
    try {
      const response = await addDonation({
        variables: { donationData: {amount: amount, session: session || ""} }
      });
      console.log(response)
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
    setRedirctTo(true);
    }, 3000);
  }
  renderDonation();
}, []);

  if (redirctTo) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <h1 className="fs-1 text-center mb-3 mb-lg-5">Success!</h1>
        <h3 className="fs-3 text-center">
          Thank you for supporting the website!
        </h3>
        <h3 className="fs-3 text-center">
          You will now be redirected to the homepage
        </h3>
      </div>
    )
  }    
}