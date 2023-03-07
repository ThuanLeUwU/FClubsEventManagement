import React from "react";
import EventStyles from "./styles/event.module.scss";

export const Events = () => {
  return (
    <section className={`${EventStyles.tournament_section}`}>
      <div className={`${EventStyles.container}`}>
        {/* <div className="row"> */}
        {/* <div className="col-lg-12"> */}
        <div className={`${EventStyles.single_tournament}`}>
          <div className={`${EventStyles.left_area}`}>
            <div className={`${EventStyles.single_play}`}>
              <div className="image">
                <img
                  className={`${EventStyles.image}`}
                  src="https://storage.googleapis.com/f-club-management.appspot.com/333117606_5953295791414127_4729393989328206991_n.jpg?GoogleAccessId=firebase-adminsdk-601p4%40f-club-management.iam.gserviceaccount.com&Expires=1893456000&Signature=f0Yq8wRigTPbDEBX9CaKS0ykQfRDwRksNS%2BKLepSc8AxfWXJKrFow%2BDLO%2FFoWQsox5HOiNBu2bYaR7hHbrTCAlQF1b4bBoa2%2BaJUsYk2B4%2Fd0OKZqotpiyYYWynbKA%2BzhrVYnmQowAC0i2jpmzNjEfENdiOPFJakuA1haGpVtUs9NO9xOILUuc6iu6ic9iU%2BrSjENBaB1vEhvH1hBNGWJGTJ9rm2qsmeOPlKBY9dSlC7w9y4yWYMumh9roDf2e7xZirVmI4SPFim%2BwHwbz7Hqlp0gjkOPf6G4HC6IwKb0xJJA2%2FV55mgobZN3rpaqhvi9nvxruvilKT8TlpnnQhC4g%3D%3D"
                  alt=""
                />
              </div>
              <div className={`${EventStyles.content}`}>
                <a
                  // style="text-decoration: none"
                  href="#"
                  className={`${EventStyles.tournament_btn}`}
                >
                  JOIN EVENT
                </a>
              </div>
            </div>
            {/* <h4 className={`${EventStyles.people_playing}`}>
              59,000 People Playing
            </h4> */}
            {/* <ul className={`${EventStyles.players_list}`}>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <span className={`${EventStyles.more_players}`}>32+</span>
              </li>
            </ul> */}
          </div>
          <div className={`${EventStyles.right_area}`}>
            <div className={`${EventStyles.right_top}`}>
              <h1>Campus Tour - Trường Đại Học FPT </h1>
              <div className={`${EventStyles.reward}`}>
                {/* <span className={`${EventStyles.reward_span}`}></span> */}
                Vietnamese Students&rsquo; Association of FPT University
                
              </div>
            </div>
            <div className={`${EventStyles.right_bottom}`}>
              <div>
                {/* <span className={`${EventStyles.title}`}>Date begin: </span> */}
                <div className={`${EventStyles.time_counter}`}>
                  {/* <i className="far fa-clock"></i>
                  <div data-countdown="2021/12/15"> */}
                  <h4>Timeline:</h4>
                  <span className={`${EventStyles.time}`}>From: 7h30, 2023-02-25</span>
                  <span className={`${EventStyles.time}`}>To: 17h00, 2023-02-25</span>
                  <h4>Location:</h4>
                  <span className={`${EventStyles.time}`}>Block E2a-7, D1 Street, Long Thanh My Avenue, Thu Duc City, Ho Chi Minh City</span>
                  {/* </div> */}
                </div>
                {/* <img src="" 
                alt="" className={`${EventStyles.time_image}`} /> */}
              </div>
              {/* <div className={`${EventStyles.time_line}`}>
                <h5 className={`${EventStyles.prize}`}>Prize pool</h5>
                <h3 className={`${EventStyles.prize_money}`}>$2,000,000</h3>
                <div>
                  <h6>9/11/22 6:00 AM - 11/02/21 5:59 AM</h6>
                  <img src="" alt="" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};
