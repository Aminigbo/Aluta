import React from 'react' 
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"
import Pills from "./includes/desktoppillsholder" 
import {logOut} from '../redux' 


const body = {
   padding:"10px 20px"
}

function Terms() { 
  
 React.useEffect(( ) => {  
      window.scrollTo(0, 0);  
   }, []);



  
 return (
    <div id="body bg">
    <div className="mobile">  
    
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    <div>  <br />
            
      <div>     
          <div animateIn='fadeIn'>
            <div style={body} className="leagues_holder">  
              <p>
                  <b> Basic Concept and Definitions</b> <br />

                    <b>1.1.</b> By using and/or visiting any section of the Website, or by opening an account through the Website, You agree to be bound by the Terms & Conditions and You accordingly: <br />
                    <b>(a)</b> agree to the use of electronic communications in order to enter into contracts; and <br />
                    
                    <b>(b) </b> waive any applicable rights or requirements which require a signature by hand, 
                    to the extent permitted by any applicable law. The Terms & Conditions do not affect your statutory rights.
                    If you have any questions in relation to these terms and conditions, you should contact us at info@ogapredictor.com . <br />

                    1.2. Furthermore, where you make prediction, or play the one-on-one game or jackpot, using the Services, or otherwise use the Services, You agree to be bound by:
                    the Rules for responsible gambling available set out under the section Responsible Gambling (Responsible Gaming Terms);
                    any rules relating to bonuses and promotions (Promotions Terms);
                    any rules applying to errors (Errors Terms);<br />

                    1.3. The following definitions are used in these Terms & Conditions:<br /><br />
                    1.3.1. ‘Account’ means a created user account with OgaPredictor.com<br /><br />
                    1.3.2. ‘Agreement’ means these terms and conditions of use<br /><br />
                    1.3.3. ‘OgaPredictor services’ mean the information service offered by OgaPredictor on the website and any other service delivered by OgaPredictor<br /><br />
                    1.3.4. ‘Member’, ‘client’ or ‘user’ means a person who has successfully created an account at OgaPredictor or any person accessing the website<br /><br />
                    1.3.5. ‘website’ means the website with the URL https://www.OgaPredictor.com<br /><br />
                    1.3.6. ‘You(r)’ means any member, user or any person accessing the website<br /><br />
                    1.3.7. ‘Third Party’ Any other person or entity besides the member, and OgaPredictor<br /><br />

                    1.3.8. "Access Device" means any electronic means of accessing the Services, including,
                     but not limited to, computers, smartphone devices, feature phones, tablet devices, touch 
                     devices or any home entertainment system such as video games consoles and smart TVs 
                     (or by any other remote means); <br /><br />
                    1.3.9. "Promotions Terms" means any terms and conditions and/or rules with regard to promotions, 
                    bonuses and special offers which may apply to any part of the Services from time to time;<br /><br />
                    1.3.10. "Betting Board" means the Betting Control and Licensing Board.<br /><br />
                    1.3.11. "Download Terms" means any additional end user terms and conditions of use which You are required 
                    to confirm Your agreement to as part of the download and/or installation of any software 
                    which You may download in order to be able to use the Website;<br /><br />
                    1.3.12. "General Terms" means the terms and conditions set out in this document;<br /><br />
                    1.3.13. "Group means" in relation to any party, a company which is from time to time a subsidiary or the ultimate holding company of that party or another direct or indirect subsidiary of any such ultimate holding company. For the purposes of this definition "subsidiary" and "holding company" have the meaning given to these expressions in the Companies Act as amended from time to time;<br /><br />
                    1.3.14. "Rules” means the Betting Rules and the specifically applicable to the relevant type of betting and/or gaming; <br /><br />
                    1.3.15. Services means, as appropriate, the services offered for the time being by the Operator through the Website, Telebetting and/or via any Access Device application;<br /><br />
                    1.3.16. "Telebetting" means the telephone betting service for the time being offered by the Operator; <br /><br />
                    1.3.17. "Terms & Conditions" means:<br />
                    (a) the General Terms;<br />
                    (b) the Privacy Policy;<br />
                    (c) where appropriate, the relevant Rules, Bonus Terms, Responsible Gaming Terms, Errors Terms and additional terms applicable to the Services that are being used by You, and  <br />
                    (d) any Download Terms;<br /><br />
                    1.4. Please read the Terms & Conditions carefully before accepting them. Once You have accepted the Terms & Conditions, please print the Terms & Conditions and store them, along with all confirmation emails, additional terms, transaction data, game rules, fair deal rules and payment methods relevant to Your use of the Website. Please note that the Terms & Conditions are subject to change, as set out in document.<br />
                    1.5. If You do not agree to accept and be bound by the Terms & Conditions, please do not open an account. Your use of any of the Services will constitute acceptance of the Terms & Conditions, which are in force.<br />
                    1.6. The Terms & Conditions govern Your contract with the Operator and will come into effect on the day you sign up on the website. For the avoidance of doubt, each and all sections of the Website and Telebetting are governed by the Terms & Conditions, and You should ensure at all times that Your use of the Services is in accordance with the Terms & Conditions.<br />
                    <br /><br />
                    2. GENERAL CONTRACTING PARTIES<br /><br />
                    2.1. The Terms & Conditions shall be agreed between You and the Operator.<br /><br />
                    2.2. References in the Terms & Conditions to "us", "our" or "we" are references to:<br /><br />
                    the Operator; or
                    in the case of Terms & Conditions relating to monies held in Your Account from time to time, to any Operator Group company which holds such money and shall (where appropriate) be deemed to include our agents, partners, and suppliers.<br />
                    2.3. Reference to "you", "your" or the "player", "customers", or "subscriber" is reference to any person using the Company’s Services and/ or any registered customer of the Company thereof.<br />
                    <br /><br /><br />
                    
                    3. CHANGES TO TERMS AND CONDITIONS<br /><br />
                    3.1. The Company reserves the right to change these Terms and Conditions at any time and without prior notice. We may need to change the Terms & Conditions from time to time for a number of reasons, including (without limitation) for commercial reasons, to comply with law or regulations, to comply with instructions, guidance or recommendations from a regulatory body, or for customer service reasons. The most up-to-date Terms & Conditions can be accessed from the Terms and Conditions link in the footer section of the Website, and the date on which they will come into force is noted.<br />
                    3.2. Where we wish to make substantial changes to the Terms & Conditions, we will give You as much prior notice of such changes as is reasonably practicable via one of the methods set out in paragraph. For minor or insubstantial changes, we may not give You any notice of such changes, so You are advised to review the Terms & Conditions through the Terms and Conditions link on the Website on a regular basis.<br />
                    3.3. Where we make changes to the Terms & Conditions which we wish to notify You of, we will do so by such method of notification as we may, in our discretion, deem appropriate, which may comprise:
                    •	email (to the email address You have previously supplied us with, if any);<br /><br />
                    •	a message to Your phone Inbox via the phone number you provided during registration; or <br /><br />
                    •	a notice on the Website are at our discretion, we invite You to accept the new Terms & Conditions by clicking on "yes" or "I accept", checking a 'tick box' or any other similar method of confirmation by You.  <br />
                    If You provide us with any such confirmation, or continue to use the Website after notification, You shall be deemed to have accepted, and are bound by the new Terms & Conditions, including but not limited to (for the avoidance of doubt) any additions, removals, substitutions or other changes to the identities of the Operator, whether or not You have read the revised Terms & Conditions.
                    3.4. Notwithstanding, if we should wish to make any changes to the terms upon which Your 
                    funds are held, we shall notify You in advance by such method as we may, in our discretion, 
                    deem appropriate. Such method shall require You to acknowledge receipt of such information 
                    by clicking on "yes" or "I accept", checking a 'tick box' or any other similar method of 
                    acknowledgment by You. If You provide us with any such acknowledgment, You shall be deemed 
                    to have accepted, and be bound by the new Terms & Conditions.<br /><br />
                    3.5. Nevertheless, it is your responsibility to regularly check for any changes.<br /><br />
                    3.6. If any change is unacceptable to You, You may either cease using the Services and/or close Your Account by complying with appropriate paragraph of these General Terms.<br /><br />
                    <br /><br /> 
                    <b> 4. OPENING ACCOUNT & REGISTRATION ACCOUNT RULES</b> <br /><br />
                    4.1. In order to make a predition or play a game using the Services, You will need to open an
                     account with the Operator ("Your Account" or "Account"). <br /><br />
                    4.2. In order to open Your Account or use the Services, You can: <br /><br />
                    •	Click on ‘Join Now’ or ‘Register’ on the Website and follow the on-screen instructions; <br />
                    •	Open by such other Account opening method as shall, from time to time be offered by 
                    the Operator. <br /><br />
                    4.3. Your Account will either be operated by the Operator, or by another company in its Group for 
                    and on behalf of itself and/or the relevant Operator Group company with whom You have contracted. <br /><br />
                    4.4. When You open Your Account, You will be asked to provide us with personal information,
                     including Your name and date of birth and appropriate contact details, telephone number
                      and e-mail address ("Your Contact Details"). You may update Your Contact Details from time to 
                      time by contacting Customer Services; or by such other method as shall, from time to 
                      time, be offered by the Operator.<br /><br />
                    4.5. In opening Your Account, You warrant that:<br />
                    •	You are over 18 years of age, and above the age at which gambling, or gaming activities are legal under the law of the jurisdiction that applies to you (“Relevant Age”).
                    •	Gambling is not illegal in the territory where You reside.<br />
                    •	You are legally able to enter into contracts;<br />
                    •	You have not been excluded from gambling.<br />
                    •	You have not already had an Account closed by us under appropriate paragraphshere
                      (Collusion, Cheating, Fraud and Criminal Activity), 
                      20 (Breach of the Terms & Conditions) or at Your request under paragraph 
                      Responsible Gambling Policy.<br /><br />
                    4.6. It is your responsibility to ensure that you are not infringing on any laws in your
                     jurisdiction when opening an account and conducting business with the Company at all times
                      during the subsistence of your subscription/ participation.<br /><br />

                    4.7. The Company will accept no liability from third parties whatsoever, resulting
                     from you providing incorrect or false data.<br /><br />
                    4.8. Your Account must be registered in Your own, correct, name and personal details and it
                     shall only be issued once for You and not duplicated through any other person, family,
                     household, address (postal or IP), email address, Access Device or any environment where Access 
                     Devices are shared (e.g. schools, workplaces, public libraries etc.) and/or account in respect of 
                     the Services. Any other accounts which You open with us, or which are beneficially owned by You
                      in relation to the Services shall be "Duplicate Accounts". You may open only one Account. 
                      Should we identify any customer with more than one account, we reserve the right to close those
                       Duplicate Accounts. Should we close a Duplicate Account:<br /><br />

                    4.8.1. All bonuses, from registrations, predictions, promos and winnings accrued from such bonus, 
                    registrations,predictions, and promos obtained using Duplicate Accounts will be void and forfeited 
                    by You;<br /><br />

                    4.8.2. We may, at our discretion, void all winnings and refund all deposits (less amounts in 
                    respect of void winnings) made in respect of any Duplicate Account and, to the extent not recovered 
                    by us from the relevant Duplicate Account, any amounts to be refunded to us by You in respect of a
                     Duplicate Account may be recovered by us directly from any other of Your Accounts
                      (including any other Duplicate Account); or <br /><br />

                    4.8.3. We may, at our discretion, allow the usage of a Duplicate Account to be deemed valid. 
                    In such case all losses and stakes placed by or for You through the Duplicate Account will be 
                    retained by us.<br /><br />

                    4.9. Selling and/or transferring and/or, acquiring of accounts to/from other players, is prohibited. 
                    Any such action will lead to the closure of such accounts and forfeiture of the funds in the account.
                     The company may in its sole discretion reopen an account if there is sufficient proof to the 
                     satisfaction of the company that a transfer was done in error.<br /><br />

                    4.10. A dormant account is an account that has not been accessed for 12 months, 
                    that has a legal registration with or without money balance. Once your account becomes 
                    dormant the Company, in accordance with the applicable law (Unclaimed Financial Assets 
                    Act of 2011), shall close your account and transfer your remaining account balance to the Unclaimed 
                    Financial Assets Authority.<br /><br /><br />

                    <b>5. Use of service:</b><br /><br />
                    5.1 In order to use our services you must be accepted as a member. Our acceptance of you as a 
                    member is conditional upon you accepting these terms and conditions.<br /><br />

                    5.2 You will only be deemed to have successfully become a member once you have:<br /><br />
                    •	created an account on our website<br />
                    •	accepted the terms of this agreement<br /><br />
                    5.3 When you register your Account, you will be asked to create a login and password. In order to 
                    prevent fraud, you must keep this password confidential and not disclose it or share it with anyone. 
                    If you know or suspect that someone else knows your password or that any other personal information 
                    has been stolen or otherwise accessed without your authority, you must notify us immediately by
                     contacting https://www.OgaPredictor.com <br /><br />

                    5.4 Your account is personal and to be used only by one unique person. You must not allow any other 
                    person or third party (including, without limitation, any minor) to use your Account. You are solely
                     responsible for all use of OgaPredictorthrough your login and password. Unless caused by our 
                     negligence, any unauthorized use of the login and password will be your sole responsibility 
                     and deemed your use. You will therefore be liable for any such unauthorized use and you are no 
                     longer eligible for our subscription extend guarantee, regardless of whether or not the third
                      party who participated had your consent. <br /><br /><br />

                    <b>6. SUSPENSION and ACCOUNT CLOSURE</b><br /><br />

                    6.1. All transactions made whilst You were underage will be made void, and all related funds 
                    deposited by You will be returned by the payment method used for the deposit of such funds,
                     wherever practicable;<br /><br />

                    6.2. Any deposits made whilst You were under the Relevant Age will be returned to You; and<br /><br />

                    6.3. Any winnings which You have accrued during such time when You were under the Relevant Age
                     will be forfeited by You (and may be deducted from the amount of any deposit returned) and You
                      will return to us on demand any such funds which have been withdrawn from Your Account.<br /><br />

                    6.4. If You become aware of any suspicious activity relating to individual(s), participants, 
                    players, officials, You must report such activity to the Company immediately.<br /><br />

                    6.5. Suspicious transactions will be reported to the relevant authorities and where 
                    the company suffers pecuniary loss or injury to its person or reputation, all legal
                     means will be employed to restore such injuries at the risk of the perpetrator.<br /><br />

                    6.6. The Company may suspend, block or close your account and withhold funds if so 
                    required by the Proceeds of Crime and Anti-Money Laundering Act No. 9 of 2009 or 
                    any relevant legislation or as demanded by the authorities.<br /><br />

                    6.7. Ogapredictor.com reserves the right to close or suspend your account at any time and 
                    for any reason. With immediate effect without limiting the preceding sentence, OgaPredictor shall
                     be entitled to close or suspend your account if:<br /><br />
                    •	you become bankrupt;<br />
                    •	OgaPredictor considers that you have used the Website in a fraudulent manner or for illegal 
                    and/or unlawful or improper purposes;<br />
                    •	OgaPredictor considers that you have used the Website in an unfair manner, have deliberately 
                    cheated or taken unfair advantage of OgaPredictor or any of its customers or if your account is 
                    being used for the benefit of a third party;<br />
                    •	OgaPredictor is requested to do so by the police, any regulatory authority or court;<br />
                    •	OgaPredictor considers that any of the events referred to in (a) to (c) above may
                     have occurred or are likely to occur;<br /><br /><br />
                     
                    <b>7. USERNAME, PASSWORD, SECURITY CODE and CUSTOMER INFORMATION</b><br /><br />
                    7.1. After opening Your Account, You must take all reasonable steps to avoid disclosing 
                    (whether deliberately or accidentally) Your username, password and/or account number to anyone 
                    else, including (where practicable) ensuring that up-to-date security software is downloaded 
                    onto Your Access Device.<br /><br />
                    7.2. All transactions made where Your username and password and/or account number have been entered 
                    correctly will be regarded as valid, whether or not authorized by You, and we shall not be liable 
                    for any claims in the event that You disclose Your username, password or account number to 
                    anyone else (whether deliberately or accidentally). If You allow or authorize another person
                     to use Your account, You shall be responsible for all transactions such a person makes 
                     using the relevant account details.<br /><br />
                    Your password details should comply with the following: <br />
                    •	Length: at least 8 characters.<br />
                    •	Use of capital-small letters, special characters and numbers.<br /><br />
                    7.3. If You have lost or forgotten Your Account details or have reason to believe that such details 
                    are known to an unauthorized third party, please contact us immediately for a replacement through 
                    Customer Services, details of which can be found in the Contact us or use the help section of 
                    the website. The Company will however not be responsible for any loss or damage that You may suffer
                     as a result of transaction made by that other persons.<br /><br /><br />


                    <b>8. DEPOSITS, TRANSFERS AND WITHDRAWALS</b><br /><br />

                    Internet Gambling may be illegal in the jurisdiction in which 
                    you are located; if so, you are not authorized to use your payment card to deposit or withdraw money 
                    using OgaPredictor .<br /><br />

                    8.1. If You wish to participate in the Services, You must deposit monies into Your Account from an 
                    account or source of which You are the account holder. Such monies may then be used by You to 
                    make predictions or play games. <br /><br />

                    8.2. If You use a payment method in respect of which You are not the account holder, we reserve
                     the right to treat any deposit into the Account as being invalid (and any winnings arising from 
                     such deposit as void) pending the satisfactory completion of all relevant Checks.<br /><br />

                    8.3. For all deposits, the mobile number of the depositor must be identical to the mobile phone 
                    number registered on the Account receiving the funds. If this is not the case, we reserve the right
                     to treat any deposit into the Account as being invalid and the funds may be returned to the mobile 
                     number, from which the funds were sent. Any charges levied by the mobile operators payment gateways
                      (M-Pesa) will be deducted from the player's Account. <br /><br />

                    8.4. Your deposit. For the avoidance of doubt Your Account shall not be used by You as a bank 
                    account and, should we become aware of deposits into and withdrawals from Your Account without 
                    commensurate betting or gaming activity, we reserve the right to deduct an administration charge
                     (whether or not we close or suspend the account). Monies deposited with us in Your Account shall 
                     not attract interest.<br /><br />

                    8.5. You should only deposit money in Your account for the purposes of you using such money to place 
                    bets/wagers on the games/player platforms. We shall be entitled to suspend or close your account if
                     we reasonably consider or have reason to believe that you are depositing money without any intention
                      to place bets/wagers. You may only bet/wager with the amount of cleared funds held in your account.
                      <br /><br />

                    8.6. Bonus funds may be credited to Your account as part of a promotion, loyalty or other marketing campaign. These funds cannot be directly withdrawn/paid-out, but must be used for the placing of future bets. Depending on the promotion, these credits may be convertible into hard currency after fulfilling a specific set of Terms and Conditions associated with the promotion.
                    <br /><br />8.7. You can at any time request a statement which would show all transactions made, namely deposits, bonus credits, winnings, bets and withdrawals. Should you notice any errors you should immediately notify the Company via written or electronic notice. Such anomaly once confirmed, will be rectified by the company in the shortest time possible at no cost to you.
                    <br /><br /> 8.8. You may request for a withdrawal of funds from Your Account at any time provided that
                    <br />•	all payments made into Your Account have been confirmed as cleared and none have been charged-back, reversed or otherwise cancelled;
                    <br />•	You have complied with any other relevant withdrawal conditions affecting Your Account (e.g. any applicable Bonus Terms). We have a number of controls measures and validation procedures that take place before any withdrawal request is processed. These measures are part of our ongoing commitment to maintaining the security of our customers' funds.
                    <br /><br />8.9. On any withdrawal approved by us, provided that You give us sufficient information as to how the funds should be transferred to You, we will return the relevant funds to You (less charges incurred or any other amount required to be deducted from Your withdrawal in order to comply with any applicable law).
                    <br /><br />8.10. Should you attempt to withdraw funds that were deposited but not used for prediction, the Company may levy a processing fee of 10% upon such withdrawals. Additionally, should these transactions be deemed suspicious, the Company will report the activity to the appropriate authority and the player may lose these funds.
                    <br /><br />8.11. Where possible, all valid withdrawals will be processed to the payment account from which the deposits were validly made. Withdrawal payments can only be made in the identity of and to the registered account holder. For most payment types, withdrawals can be processed by following the withdrawal protocol steps provided, subject to there being sufficient funds in your betting account.
                    <br /><br />8.12. There is no set maximum withdrawal amount per day but if withdrawal requests exceed amounts greater than N1, 000, 000, then a Bank Wire Transfer will be arranged . Full Bank accounts details should be provided by the customer.
                    <br /><br />8.13. If the value of a deposit is not played through in full before a withdrawal is requested, the Company reserves the right to make a charge to the customer's account to cover all reasonable costs relating to both the deposit and withdrawal. If necessary, the value of the withdrawal requested may be reduced accordingly but the fee incurred to the customer's account will not exceed 10% of the deposit in question.
                    <br /><br />8.14. The Company may, at any time, set off any positive balance in Your Account against any amounts owed by You (including under a Duplicate Account) to the Company or any other company within the Company’s Group (irrespective of whether there has been a breach of the Terms & Conditions) including (without limitation) where we re-settle any bets or wagers pursuant with these Terms & Conditions.
                    <br /><br />8.15. To the extent required by Your local law or tax or other authorities You are responsible for reporting Your winnings and losses arising from the Services.
                    <br /><br />8.16. All account transactions are performed in Naira. No interest is paid on any funds, irrespective of the amount held in your account or any delay in remitting funds in your account for any reason.
                    <br /><br /><br /><b>9. LEGAL USE OF THE WEBSITE AND SERVICES</b> <br /><br />
                    9.1. Access to or use of the Website, or any of the Services via the Website, or any Access Device may not be legal for some or all residents or persons in certain countries. We do not intend that the Website should be used for prediction, betting, gaming or any other purposes by persons in countries in which such activities are illegal. The fact that the Website is accessible in any such country, or appears in the official language of any such country shall not be construed as a representation or warranty with in respect to the legality or otherwise of the access to and use of the Website, and the making of any deposits or receipt of any winnings.
                    The availability of the Website does not constitute an offer, solicitation or invitation by us for the use of or subscription to betting, gaming or other services in any jurisdiction in which such activities are prohibited by law.
                    <br /><br />9.2. It is Your responsibility to determine the law that applies in the location in which You are present. You should ensure that You will be acting legally in Your jurisdiction in opening Your Account and/or using the Website and You represent, warrant and agree that You will do so.
                    <br /><br />9.3. If it becomes apparent to us that You are a resident in a country in which the use of the Website is not legal, we shall be entitled immediately to close Your Account, in which case any balance on the Account on the date of such closure will be refunded to You as soon as it is practicable for us to do so.
                    <br /><br /><br />9.4. Should you be able to access and use the Services from your location, you shall be responsible for reporting your winnings and losses to the tax and/or other authorities as per the existing regulations within your jurisdiction as well as bearing any other charges levied in your jurisdiction.
                    <br /><br /><br /><b>10. INTELLECTUAL PROPERTY</b> <br /><br />   
                    The information contained on our website is copyrighted and protected by worldwide copyright laws and treaty provisions. It may not be copied, reproduced, modified, published, uploaded, posted, transmitted, or distributed in any way, without our prior written permission. Except as expressly provided herein, OgaPredictor does not grant any express or implied rights to members or any other person over any intellectual property rights, names and details of members or other trade secret information. OgaPredictor.com is the owner or authorised user or licensee of all the intellectual property rights in the website including, without limitation, any copyright, patent, registered design, trademarks, service marks, source codes, specifications, templates, graphics, logo(s) or any right subsisting in Nigeria or elsewhere in respect of formats, interfaces, programming, the offering of services to other customers, software or any application for any of the foregoing and any modification, improvements, developments and enhancements thereof. Except as expressly provided herein, members or any other persons are not permitted to interfere with, infringe or violate any intellectual property rights of OgaPredictoror its licensors and agree not to interrupt or attempt to interrupt the operation of the website. Any member that posts data, information, material or content on the website shall and hereby grant(s) OgaPredictora worldwide, royalty-free, sub-licensable, perpetual, irrevocable license to use, copy, reproduce, link, modify, adapt, frame, brand, distribute and publish such data, information or material on any media now known or later developed. No links to the website are permitted without our prior written permission.
                    <br /><br /><br />11. Force Majeure:
                    We shall not be liable, and shall not otherwise be deemed to be in breach of this Agreement, for any failure to perform, or delay in performing, any of our obligations hereunder caused by circumstances beyond our reasonable control, including but not limited to government or regulatory restrictions, acts of God, power cuts, trade or labour disputes, act failure or omission of any government or authority, the failure of electronic or mechanical equipment or communication lines, telephone or other interconnection problems (e.g. if a member of OgaPredictor is unable to access his/her online service provider), hacking, unauthorized access, theft, operator errors, severe weather, earthquakes, floods and strikes or other labor problems. In such an event, we may (in our sole and absolute discretion) cancel or suspend the OgaPredictorservices without incurring any liability. We will not be liable for the failure of any equipment or software, wherever located or administered, whether under our direct control or not, that may prevent the operation of the OgaPredictorservices, impede the placing of bets, or prevent members from being able to contact us. We will not be liable for any failure to perform by a third party from this agreement. In particular, we may in our sole and absolute discretion declare null and void any contracts that OgaPredictormay not be able to settle because of non-performance by a third party.
                    <br /><br /><br />12. Disclaimer:
                    OgaPredictorservices, including the website, and all information and content provided in connection therewith are provided ‘as is’ and ‘as available’, without any warranties of any kind, either express or implied, including any warranties of fitness for a particular purpose, fitness for any member’s betting or gambling objectives, financial situation, or means. You understand that no content published in connection with the OgaPredictorservices including without limitation, constitutes a recommendation or opinion with respect to any particular bet, betting, gambling, transaction or betting strategy or its suitability for any specific person. OgaPredictormakes no, and, to the fullest extent permitted under law, hereby disclaims all, representations or warranties of any kind, express or implied, as to the availability, operation and use of the site or the information, content, or services on or accessed via the site, including but not limited to warranties of merchantability, fitness for a particular purpose, title, non-infringement. Neither the site, nor any information, content, or services available via the site, constitutes or is intended to constitute, or should be construed as, a solicitation or any offer to place bets, trades, gamble , betting advice, gambling advice, investment advice or a recommendation or promotion of any transaction, or other financial product. The results and information provided by the OgaPredictorservices and/or on the website may be wrong, inaccurate, outdated, partial or incomplete or do not fit for a particular purpose and do not taking into account any member’s financial objectives, financial situation, or means. We cannot guarantee that bookmakers we recommend are trustworthy. It is up to each individual member to do their own research on whether the bookmaker can be trusted. OgaPredictorcan not be held responsible for any losses for the member inflicted by the bookmaker for any reason including, but not limited to the bookmaker becoming insolvent, bankrupt or for any other reason withholding the member’s money. For the avoidance of doubt OgaPredictor, its officers, directors, employees, affiliates and any other third party that OgaPredictorengages with, hold no responsibility whatsoever regarding the information and/or its accuracy provided through the OgaPredictorservice. OgaPredictorcannot be held responsible for any losses or consequential losses arising from the use of this website. The member must be aware that there are risks involved with every sports betting transaction, and OgaPredictordoes not guarantee winnings from the presented information and any other data presented by the OgaPredictorservice. The information presented by the OgaPredictorservice is for information purposes only and should under no circumstances whatsoever be considered as betting advice. OgaPredictor cannot be held responsible in any way for the accuracy or inaccuracy of the information presented on the OgaPredictorservice. By using the OgaPredictorservice and accepting the terms and conditions the member agrees to take the full responsibility of all losses or consequential losses that follow based on the information provided by the OgaPredictorservice. You are solely responsible for any actions or decisions you take based on information available through our website and OgaPredictorservices, and should carry out your own research and investigation as appropriate.

                    <br /><br /><br />13. EXCLUSION OF LIABILITY
                    To the fullest extent permitted by law, we are not responsible nor shall we be liable for any damages, loss, costs or consequences of any nature whatsoever that are alleged to or have occurred through a member’s use, or misuse, of the OgaPredictorservices. Without derogating from the generality of the provisions above: we will not be liable for any loss that members may incur as a result of the misuse of passwords, member names, digital certificates or other identification means accepted by the company and we accept no liability resulting from any unauthorized use, whether fraudulent or otherwise.

                    OgaPredictorservices are provided ‘as is’ without any express or implied warranty of any kind, including warranties of merchantability, non-infringement of intellectual property, or fitness for any particular purpose. OgaPredictoris in no event liable for any damages whatsoever including, without limitation, damages for loss of direct or indirect profits, economic loss, business interruption, loss of information or any direct, indirect, consequential, punitive, special, exemplary or special losses and/or damages however caused, including but not limited to any loss of contracts, loss of goodwill and loss of reputation arising out of the use of or inability to use the OgaPredictorservices, even if we have been advised of the possibility of such damages. Because some jurisdictions prohibit the exclusion or limitation of liability for consequential or incidental damages, the above limitation of this section may not apply to you.

                    Under no circumstances shall OgaPredictoror its officers, directors, employees, parents, partners, successors, agents, distribution partners, affiliates, subsidiaries or related companies or any third party working with the company be liable for indirect, incidental, special, consequential or exemplary damages, including without limitation, loss of profits or loss of data (even if OgaPredictor has been advised of the possibility of such damages), arising out of, relating to, or in any way connected with the services, including without limitation, the website or these terms and conditions. Your sole remedy for dissatisfaction with our site or services including, without limitation the content is to stop using our site and services. This limitation shall also apply with respect to damages incurred by reason of services or products, information, advice, information or advertising received through or in connection with our site or services or any links provided via any of the foregoing. These limitations shall apply to the fullest extent permitted by law.
                    If, through use of the OgaPredictorservices, a member causes us to publish, whether on the website, via email or otherwise, potentially defamatory, illegal, obscene, offensive material, that member agrees that he/she shall be solely liable for the publication of such material and that he/she will indemnify OgaPredictorfor all costs, penalties, liabilities and charges incurred by it in relation to such publication.
                    In any case OgaPredictorcannot be held accountable by a member for more than the total paid subscription fees since the occurrence of the liability.
                    Under no circumstance nothing in the Terms & Conditions will operate as to include any liability which we may have in respect of:
                    Fraud (including fraudulent misrepresentation); or
                    Death or personal injury arising out of the Terms & Conditions or any use of our services.
                    <br /><br /><br /><b>14. BREACH OF THE TERMS AND CONDITIONS</b>
                    <br /><br />14.1. You will fully indemnify, defend and hold us and our officers, directors, employees, agents, contractors and suppliers harmless from and against any and all losses, costs, expenses, claims, demands, liabilities and damages (including legal fees), however causes that may arise, whether or not reasonably foreseeable, as a result of or in connection with:
                    <br /><br />14.1.1. The access to and use of the Services by You or by anyone else using Your username and password; and/or
                    <br /><br />14.1.2. Any breach by You of any of the terms and provisions of the Terms & Conditions.
                    <br /><br />14.2. Where You are in breach of the Terms & Conditions, we may at our sole discretion, prior to any suspension or termination of Your Account, notify You (using Your Contact Details) that You are in breach, requiring You to stop the relevant act or failure to act, and/or requiring You to put right an act or fault on Your part and warning You of our intended action if You do not do so, provided always that such notification shall not be a pre-condition to any suspension or termination of Your Account.
                    <br /><br />14.3. We have the right to disable any user identification code or password, whether chosen by You or allocated by us, at any time, if in our reasonable opinion You have failed to comply with any of the provisions of the Terms & Conditions.
                    <br /><br />14.4. In addition to any other remedy available, if You breach any of the Terms & Conditions, we shall be entitled to recover from Your Account any positive balance to the extent of any amount reasonably claimed against You pursuant to paragraph 14.1.
                    <br /><br /><br />15. COMPLAINTS
                    <br /><br />15.1. You acknowledge that our random number generator will determine the outcome of the games played through the Services and You accept the outcomes of all such games. You further agree that in the unlikely event of a disagreement between the result that appears on Your screen and the game server used by the Operator, the result that appears on the game server will prevail, and You acknowledge and agree that our records will be the final authority in determining the terms and circumstances of Your participation in the relevant online gaming activity and the results of this participation.
                    <br /><br />15.2. No claims or disputes will be accepted regarding to:
                    <br /><br />15.2.1. the acceptance or settlement of a bet which You have made using the Services after thirty days of the date of the original transaction;
                    <br /><br />15.2.2. a game which You have played using the Services after twelve weeks of the date on which the relevant transaction or game play took place.
                    <br /><br />15.3. Should You wish to make a complaint regarding the Services, as a first step You should, as soon as reasonably practicable, contact Customer Services about Your complaint, which will be escalated as necessary to the relevant Department until resolved.
                    <br /><br />15.4. If there is a dispute arising from the Terms & Conditions which cannot be resolved by Customer Services and having been escalated, You can request the matter be addressed by a manager or supervisor. Where we will endeavor to resolve the matter to the best of our ability for Your satisfaction according to our Terms and Conditions.
                    <br /><br />15.5. The Company will always apply best efforts to resolve a reported matter promptly.
                    <br /><br />15.6. If You are not satisfied with the resolution of the complaint by the Company, You agree that the matter may be referred for adjudication by the Betting Board. The Betting Board’s decision will be final so long as the full facts are presented by all parties concerned.
                    <br /><br />15.7. In all other instances, or where you do not wish to contact the Betting Board, where a dispute arises, parties shall refer the matter for arbitration by a single arbitrator agreed by the parties where the chosen venue, with the arbitration being conducted in English. Where the parties are unable to agree on the identity of the arbitrator the chairman for the time being of the Chartered Institute of Arbitrators.
                    <br /><br /><br />16. MISCELLANEOUS
                    <br /><br /> 16.1. In no event will any delay, failure or omission (in whole or in part) in enforcing, exercising or pursuing any right, power, privilege, claim or remedy conferred by or arising under these Terms & Conditions or by law, be deemed to be or construed as a waiver of that or any other right, power, privilege, claim or remedy in respect of the circumstances in question, or operate so as to bar the enforcement of that, or any other right, power, privilege, claim or remedy, in any instance at any time or times subsequently.
                    <br /><br /> 16.2. The rights and remedies provided by these Terms and Conditions are cumulative and (unless otherwise provided in these Terms & Conditions) do not exclude any other rights or remedies available in law.
                    <br /><br /> 16.3. If any provision of these Terms & Conditions is found by any court or administrative body of competent jurisdiction to be invalid or unenforceable, such invalidity or unenforceability shall not affect the other provisions of these Terms & Conditions, which shall remain in full force and effect.
                    <br /><br /> 16.4. You shall confirm/accept and where necessary execute or cause to execute all documents and do all further acts and things consistent with the terms of these Terms & Conditions that the Company may from time to time reasonably require in order to vest in and secure the Company's full rights and benefits to be transferred or granted to the Company under these Terms and Conditions and for the protection and enforcement of the same and otherwise to give full effect to the terms of these Terms & Conditions.
                    <br /><br /> 16.5. Nothing in these Terms and Conditions shall create or be deemed to create a partnership, joint venture or principal-agent relationship between the parties and no party shall have authority to bind any other in any way unless expressly provided otherwise in these Terms and Conditions.
                    <br /><br /> 16.6. The Company shall not be in breach of these Terms & Conditions nor liable for delay in performing, or failure to perform, any of its obligations if such delay or failure results from events, circumstances or causes beyond its reasonable control including (without limitation) any telecommunications network failures, power failures, failures in third party computer hardware or software, fire, lightning, explosion, flood, severe weather, industrial disputes or lock-outs, terrorist activity and acts of government or other competent authorities. In such circumstances the time for performance shall be extended by a period equivalent to the period during which performance of the obligation has been delayed or failed to be performed.
                    <br /><br /> 16.7. The Company may assign, transfer, charge, sub-license or deal in any other manner with these Terms and Conditions, or sub-contract any of its rights and obligations under these Terms and Conditions, to any party including any company within the Company group. You may not assign, sublicense or otherwise transfer in any manner whatsoever any of Your rights or obligations under the Terms & Conditions.
                    <br /><br /> 16.8. When we wish to contact You, we may do so using any of Your Contact Details. You may contact us through any of the contact details provided on the Website. Notices will be deemed to have been properly served and received by You immediately after an email is sent or after we have communicated with You directly by telephone (including where we leave You a voicemail), or three days after the date of posting of any letter. In proving the service of any notice, it will be sufficient to prove, in the case of a letter, that such letter was properly addressed, stamped and placed in the post; in the case of an email, that such email was sent to the specified email address (if any) in Your Contact Details at the time that any such email was sent.
                    <br /><br /> 16.9. The right to access and/or use OgaPredictor (including any or all of the products offered via the Website) may be illegal in certain countries . You are responsible for determining whether your accessing and/or use of OgaPredictor is compliant with applicable laws in your jurisdiction .
                    <br /><br /> 16.10. The Terms & Conditions and any document expressly referred to in them and any guidelines or rules posted on the Website form an integral part of these Terms and Conditions and shall have effect as set out in the full body of these Terms and Conditions.



              </p>
            </div>
          </div> 
        <Pills />
      </div>   
      <br />
    </div> 
    </div> 
      
      {/* desktop left */}
      <Desktopleft />
      
        
        {/* desktop right */}
        <Desktopright />
        
    </div>
  )
   
}


const mapStateToProps = state => { 
  return {
    appState: state.user
  }
}


const mapDispatchToProps = (dispatch,encoded) => {
  return {
    logout: () => dispatch(logOut()), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terms)