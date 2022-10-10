import { Actions } from "@twilio/flex-ui";
const PLUGIN = "SIP-OUTBOUND-DIAL";

// Adding a listener
Actions.addListener('beforeStartOutboundCall', (payload) => {
    console.log(PLUGIN,` - beforeStartOutboundCall Listener Triggered`);

    /* 
    
        CRITICAL!!!! Update emergencyNumbers to include any emergency numbers relevant to your business  CRITICAL!!!!
                     Update allowedCountryCodes to represent country codes you are allowed to dial

        It is critical you have Emergency dialing to your business desired destination.  IE through Twilio's Super Network
        or via your SIP connection.  If you wish to have emergency dialing through your SIP connect, remove the Emergency Dialing
        Excemption below

    */

    // Emergency Dialing Excemption

    const emergencyNumbers = ["911", "060", "065"];
    if (emergencyNumbers.some(n => payload.destination.match(n))) {
        console.log(PLUGIN,` - Emergency Number Dialed!`);

    } else {
        // List of number(s) or range(s) you wish to leverage as a SIP target
        const numbers = ["+13179519753","13179519753"];
        if (numbers.some(n => payload.destination.includes(n))) {
            console.log(PLUGIN,` - Match found, leveraging SIP target!`);

            // Storing the original destination and cleaning up the UI so it doesn't show a SIP target
            payload.taskAttributes = {to: payload.destination};
            // Match found, we will overwrite the payload destintation to leverage a SIP Enpoint/Interface target
            // REPLACE the @xxxx with your SIP Endpoint
            payload.destination = `sip:${payload.destination}@xxxx`;
        } else {
            console.log(PLUGIN,` - Non-SIP call taken!`);
        }
    }
});