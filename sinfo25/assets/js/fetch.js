$(document).on('ready', function () {
  var event = '25-sinfo';

  fetchFromDeck('speakers',`sort=name&event=${event}&&participations=true`, processSpeaker, speakers);
  fetchFromDeck('members',`sort=name&event=${event}&&participations=true`, processMember);

  var data = {
    event: event,
    counter: 0,
    speakers: {}
  }

  fetchFromDeck('events', '', getDatesAndSessions, data);
  //fetchFromDeck('companies','event=24-sinfo&&participations=true', processSponsors);
});

function fetchFromDeck(field, params, processDataFromDeck, extraData) {
  var deck = 'https://deck.sinfo.org:443/api/';
  var request = new XMLHttpRequest();
  request.open('GET', deck + field + '?' + params);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    request.response.forEach(function(el){
      if (extraData)
        return processDataFromDeck(el, extraData);
      return processDataFromDeck(el);
    });
  }
}

function twoDigit(number) {
  return (number < 10 ? '0' : '') + number
}

function getDatesAndSessions(event, data) {
  if (event.id !== data.event) return;
  
  data.dates = {};
  var date = new Date(Date.parse(event.date));
  var duration = (new Date(Date.parse(event.duration))).getDate();
  
  for (let i = 1; i <= duration; i++) {
    data.dates[date.getDate()] = 'day' + i;
    
    let day = twoDigit(date.getDate());
    let month = twoDigit(date.getMonth());
    let year = date.getFullYear();

    $(`#day${i}-li p`).text(`${day}/${month}/${year}`);
    date.setDate(date.getDate() + 1)
  }
  
  fetchFromDeck('sessions', `sort=date&event=${data.event}`, processSessions, data)
}

function processSessions(session, data) {
  
  $('#schedule').show();

  function parseSpeakers(speakersList) {
    parsed = '';

    speakersList.forEach( function (speaker) {
      var name = '';

      if (data.speakers[speaker.id]) {
        name = data.speakers[speaker.id].name;
      } else {
        name = speaker.id.replace(/-/g, ' ')
      }
  
      if (!speakersList.length) {
        parsed += ', ';
      }
      parsed += name;
    });

    return parsed;
  }

  var htmlParent = '';
  var html = '';
  var date = new Date(Date.parse(session.date));
  var duration = new Date(Date.parse(session.duration));
  var day = data.dates[date.getDate()];
  var time = `${date.getHours()}:${twoDigit(date.getMinutes())}`;

  if (session.kind === 'Keynote') {
    html = `
      <div class="panel schedule-item">
        <div class="lecture-icon-wrapper">
          <img src="${session.img}" alt="" class="img-responsive">
        </div>
        <a data-toggle="collapse" data-parent="#${day}_keynotes_${data.counter}_timeline" href="#${day}_keynotes_time${data.counter}" class="schedule-item-toggle">
          <strong class="time highlight"><span class="icon icon-office-24"></span>${time}
          <span class="icon icon-office-47 place"></span>${session.place}
          </strong>
          <h6 class="title">
            <strong class="highlight speaker-name">
              ${parseSpeakers(session.speakers)}
            </strong>
            &#8212 ${session.name.split(' - ')[1]}<i class="icon icon-arrows-06"></i></h6>
        </a>
        <div id="${day}_keynotes_time${data.counter}" class="panel-collapse collapse in schedule-item-body">
          <article>
            <p class="description">${session.description}</p>
          </article>
        </div>
      </div>
    `;

    htmlParent = `#${day}_keynotes > div`;

  } else if (session.kind === 'Presentation' || session.kind === 'Workshop') {
      if (!session.place) return;
      var place = 'room' + session.place.split(' ')[1];

      html = `
        <div class="panel schedule-item ${place === 'room2' ? 'presentations-item' : ''}">
          <div class="lecture-icon-wrapper">
            <img src="${session.img}" alt="" class="img-responsive">
          </div>
          <a data-toggle="collapse" data-parent="#${day}_presentations_${data.counter}_timeline" href="#${day}_presentations_time${data.counter}" class="schedule-item-toggle">
            <strong class="time highlight"><span class="icon icon-office-24"></span>${time} PM
            <span class="icon icon-office-47 place"></span>${session.place}
            </strong>
            <h6 class="title">${session.name}<i class="icon icon-arrows-06"></i></h6>
          </a>
          <div id="${day}_presentations_time${data.counter}" class="panel-collapse collapse in schedule-item-body">
            <article>
              <p class="description">${session.description}</p>
              <strong class="highlight speaker-name">${parseSpeakers(session.speakers)}</strong>
            </article>
          </div>
        </div>
      `

      htmlParent = `#${day}_${session.kind.toLowerCase()}s .${place}`;
  }

  data.counter += 1;
  $(htmlParent).append(html);
}

function processMember(member) {
  // Dom Load hack
  setTimeout(function() {
    if( member.name !== "ToolBot!" )
      $("#team > div").append(html);
  }, 1);

  var html = `
  <div class="col-sm-2">
    <div class="speaker member">
      <div class="photo-wrapper rounded">
        <img src=${member.img} alt=${member.name} class="img-responsive">
          <ul class="speaker-socials">
            ${getSocial()}
          </ul>
      </div>
      <h3 class="name">${member.name}</h3>
    </div>
  </div>
  `;

  function getSocial(){
    var socialNav = "";
    
    if (member["mail"])
    socialNav += `<li><a href='mailto:${member["mail"]}'><span class="fa fa-envelope"></span></a></li>`;
    
    if (member["twitter"])
      socialNav += `<li><a href='https://twitter.com/${member["twitter"]}'><span class="fa fa-twitter"></span></a></li>`;

    if (member["facebook"])
      socialNav += `<li><a href='https://facebook.com/${member["facebook"]}'><span class="fa fa-facebook"></span></a></li>`;

    if (member["github"])
      socialNav += `<li><a href='https://github.com/${member["github"]}'><span class="fa fa-github"></span></a></li>`;

    return socialNav;
  }
}

function processSpeaker (speaker, speakers) {
  var companyLogo = `https://static.sinfo.org/SINFO_25/speakersCompanies/${speaker.name.replace(/\s/g, '')}.png`

  speakers[speaker.id] = {
    companyLogo: companyLogo,
    img: speaker.img,
    name: speaker.name,
    title: speaker.title
  };

  $("#speakers > div").append(`
    <div class="col-sm-3">
      <div class="speaker">
        <div class="photo-wrapper square">
          <div class="view view-first"
            style="background-image:url('${companyLogo}');">
            <img src=${speaker.img} alt="${speaker.name}" class="img-responsive">
          </div>
        </div>
        <h3 class="name">${speaker.name}</h3>
        <p class="text-alt"><small>${speaker.title}</small></p>
      </div>
    </div>
  `)
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
