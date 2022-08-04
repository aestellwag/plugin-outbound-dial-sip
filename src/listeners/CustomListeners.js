import { Actions } from "@twilio/flex-ui";

// Adding a listener
Actions.addListener('beforeStartOutboundCall', (payload) => {
    console.log(`beforeStartOutboundCall Listener Triggered`);

    /* 
    
        CRITICAL!!!! Update emergencyNumbers to include any emergency numbers relevant to your business  CRITICAL!!!!
                     Update allowedCountryCodes to represent country codes you are allowed to dial

    */

    // Emergency Dialing Excemption

    const emergencyNumbers = ["911", "060", "065"];
    if (emergencyNumbers.some(n => payload.destination.match(n))) {
        console.log(`Emergency Number Dialed!`);

    } else {
        // List of number(s) or range(s) you wish to leverage as a SIP target
        const numbers = ["+13179519753","13179519753"];
        if (numbers.some(n => payload.destination.includes(n))) {
            console.log(`Match found, leveraging SIP target!`);

            // Match found, we will overwrite the payload destintation to leverage a SIP Enpoint/Interface target
            // REPLACE the @xxxx with your SIP Endpoint
            payload.destination = `sip:${payload.destination}@xxxx`;
        } else {
            console.log('Non-SIP call taken!');
        }
    }
});
