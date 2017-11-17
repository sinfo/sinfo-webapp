var  deck = 'https://deck.sinfo.org:443/api/';

$(document).on('ready', function () {
  fetchFromDeck('members','event=25-sinfo&&participations=true', processMember);
  fetchFromDeck('companies','event=24-sinfo&&participations=true', processSponsors);
});

function fetchFromDeck(field, params, processDataFromDeck) {
  var request = new XMLHttpRequest();
  request.open('GET', deck + field + '?' + params);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    request.response.forEach(function(el){
      processDataFromDeck(el);
    });
  }
}

function processMember(member) {
  // Dom Load hack
  setTimeout(function() {
    $("#team > div").append(html)
  }, 1);

  var html = `
  <div class="col-sm-2">
    <div class="speaker member">
      <div class="photo-wrapper rounded">
        <img src=${member.img} alt=${member.name} class="img-responsive">
      </div>
      <h3 class="name">${member.name}</h3>
      <ul class="speaker-socials">
        ${getSocial()}
      </ul>
    </div>
  </div>
  `;

  function getSocial(){
    var socialNav = "";
    if (member["twitter"])
      socialNav += `<li><a href='https://twitter.com/${member["twitter"]}'><span class="fa fa-twitter"></span></a></li>`;

    if (member["facebook"])
      socialNav += `<li><a href='https://facebook.com/${member["facebook"]}'><span class="fa fa-facebook"></span></a></li>`;

    if (member["github"])
      socialNav += `<li><a href='https://github.com/${member["github"]}'><span class="fa fa-github"></span></a></li>`;

    return socialNav;
  }
}

function processSponsors(sponsor) {
  var platinumPerLine = 4;

  /* diamond */
  if (sponsor.advertisementLvl == 'exclusive') {
    $("#sponsors-diamond").append(
      `<div class="sponsor big"><img src=${sponsor.img} alt=""></div>`
    );
  }

  /* platinum */
  else if (sponsor.advertisementLvl == 'max') {
    var loadedPlatinum = $(".platinum");
    var lastPlatinum = loadedPlatinum[loadedPlatinum.length - 1];

    /* if this div has fewer than 6 sponsors */
    if (lastPlatinum && $(lastPlatinum).children().length < platinumPerLine) {

      $(lastPlatinum).append(
        `<div class="sponsor"><img src=${sponsor.img} alt=""></div>`
      );
    }

    /* else, create new div */
    else {
      $('#sponsors > div').append(
        `<div class="sponsors platinum">
        <div class="sponsor"><img src=${sponsor.img} alt=""></div>
        </div>`
      );
    }
  }
}
