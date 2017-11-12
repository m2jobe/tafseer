import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SidebarContent extends React.Component {

  componentDidMount() {
    const { history } = this.props;
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = history.location;
    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    history.listen((location) => {
      highlightActive(location.pathname);
    });
  }

    shouldComponentUpdate() {
      // should this be commented? uncomment if issuesreturn false;
    }

  render() {

    return (
      <ul className="nav" ref={(c) => { this.nav = c; }}>

          <li >
            <FlatButton className="sidebar-button"   >
              <span className="nav-text">Preface</span>
            </FlatButton>
            <ul >
              <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleID(this, 8)"> About This Site</FlatButton></li>
              <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleAndScroll(this, 8, 'translationFeatures')"> Some Features of the Translation</FlatButton></li>
              <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleAndScroll(this, 8, 'transliteration')"> Transliteration of Arabic words</FlatButton></li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">Intro</span>
            </FlatButton>
            <ul >
              <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleID(this, 11)"> Knowing the basics about <br /> the Qur-aan</FlatButton></li>
              <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleID(this, 13)"> Guidelines for Understanding <br /> the Qur-aan</FlatButton></li>
              <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleID(this, 15)"> Starting with the Right <br /> Perspective</FlatButton></li>
              <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleID(this, 14)"> Studying the Qur-aan with <br /> the Right Mindset</FlatButton></li>
            </ul>
          </li><li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">The First Group</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 29)" > Intro to the First Group
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 1 Al-Faatiĥah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-fatihah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeTFatihah(this,'al-fatihah')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this, 'al-fatihah')" >The Significance of Al-Faatiĥah</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 2 Al-Baqarah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-baqarah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-baqarah')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleID(this, 17)"> Naasikh and Mansookh</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 3 Aaali 'Imran
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'aali-imran')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'aali-imran')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleID(this, 16)"> Muhkamaat and Mutashabihaat</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 4 An-Nisaa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-nisa')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-nisa')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 5 Al-Maaidah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-maidah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-maidah')" > Teachings</FlatButton></li>
                </ul>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">The Second Group</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 30)" > Intro to the Second Group
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 6 Al-An'aam
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-anam')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-anam')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 7 Al-A'raaf
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-araf')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-araf')" > Teachings</FlatButton></li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 61)" > The Story of Moosa and Khadhir
                    </FlatButton>
                  </li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 8 Al-Anfaal
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-anfal')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-anfal')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 45)" > The Truth and Lies About <br />the Battle of Badr</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 9 At-Tawbah or Al-Baraa'ah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-taubah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeTTaubah(this,'at-taubah')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this, 'at-taubah')" > Violence &amp; Genocide in the Bible</FlatButton></li>
                </ul>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">The Third Group</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 31)" > Intro to the Third Group
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 10 Yoonus
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'yunus')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'yunus')" > Teachings</FlatButton></li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 64)" > The Story of Yoonus
                    </FlatButton>
                  </li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 11 Hoode
                </FlatButton>
                <ul  id="tree-hud">
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'hud')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'hud')" > Teachings</FlatButton></li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 54)" > Location of Mount <br /> Al-Judiyy (Judi)
                    </FlatButton>
                  </li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 452)" > Noah of the Bible in comparison <br /> with Nooĥ of the Qur-aan
                    </FlatButton>
                  </li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 55)" > Have the Remnants of Noah’s <br /> Ark been Found?
                    </FlatButton>
                  </li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 56)" > Hoode and 'Aad of Iram
                    </FlatButton>
                  </li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 69)" > Thamood and Saalih
                    </FlatButton>
                  </li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 12 Yoosuf
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'yusuf')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'yusuf')" > Teachings</FlatButton></li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 68)" > The Story of Yoosuf
                    </FlatButton>
                  </li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 60)" > Joseph of the Bible and the Talmud <br /> Compared with Qur-aan
                    </FlatButton>
                  </li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 62)" > Who Was the King Who Dreamed?
                    </FlatButton>
                  </li>
                  <li>
                    <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 57)" > Jewish Mythology about Joseph <br /> and his Brothers
                    </FlatButton>
                  </li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 13 Ar-Ra'd
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ar-rad')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ar-rad')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 14 Ibraheem
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ibrahim')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ibrahim')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 15 Al-Ĥijr
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-hijr')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-hijr')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 16 An-Naĥl
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-nahl')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-nahl')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 38)" > The Translation of <br /> Verse 101</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 47)" > Treatment of Daughters and <br /> Infantcide in Different Societies</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 17 Al-Israa or Banee Israʻeel
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-isra')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-isra')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 20)" > The Qur-aanic Use of the Word <br />"Rooh"</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 23)" > The Reality of Israa and Miʻraaj <br />in the Light of the Qur-aan</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 18 Al-Kahf
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-kahf')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-kahf')" > Teachings</FlatButton></li>
                  {/*<li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'al-kahf')" class="sideMenuLink"></i> Stories of the Soorah</FlatButton></li>*/}
                  <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleAndScroll(this, 80, 'versions')"> The Qur-aanic vs. Judaeo-Christian Versions</FlatButton></li>
                  <li><FlatButton className="sidebar-button"   onClick="highlightMe(this); getArticleAndScroll(this, 80, 'differences')"> Different Opinions about Al-Kahf Questions</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 19 Maryam
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'maryam')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'maryam')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 20 Ŧaa Haa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ta-ha')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ta-ha')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 21 Al-Anbiyaa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-anbiya')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-anbiya')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 22 Al-Ĥajj
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-haj')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-haj')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'al-haj')" > False Allegations About Verse 52 </FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 23 Al-Mu’minoon
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-muminun')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-muminun')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 24 An-Noor
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-nur')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-nur')" > Teachings</FlatButton></li>
                </ul>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">The Fourth Group</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 32)" > Intro to the Fourth Group
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 25 Al-Furqaan
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-furqan')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-furqan')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 26 Ash-Shu‘araa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ash-shuara')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ash-shuara')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 27 An-Naml
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-naml')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-naml')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 28 Al-Qaŝaŝ
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-qasas')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-qasas')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 29 Al-‘Ankaboot
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-ankabut')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-ankabut')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 30 Ar-Room
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ar-rum')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ar-rum')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'ar-rum')" > More Information About the <br /> Rome/Persian War </FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 31 Luqman
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'luqman')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'luqman')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 32 As-Sajdah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'as-sajdah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'as-sajdah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 33 Al-Aĥzaab
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-ahzab')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-ahzab')" > Teachings</FlatButton></li>
                </ul>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">The Fifth Group</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 33)" > Intro to the Fifth Group
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 34 Sabaa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'saba')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'saba')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 35 Faaŧir
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-fatir')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-fatir')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 36 Yaa-Seen
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ya-sin')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ya-sin')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 37 Aŝ-Ŝaafaat
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'as-saffah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'as-saffah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 38 Ŝaad
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'sad')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'sad')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 39 Az-Zumar
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'az-zumar')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'az-zumar')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 40 Al-Mu’min or Ghaafir
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ghafar')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ghafar')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 41 Ĥaa Meem As-Sajdah or Fuŝŝilat
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'fusilat')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'fusilat')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 42 Ash-Shoora
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ash-shura')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ash-shura')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 43 Az-Zukhruf
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'az-zukhruf')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'az-zukhruf')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 44 Ad-Dukhaan
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ad-dukhan')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ad-dukhan')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'ad-dukhan')" > Analysis of the Ahaadeeth <br /> about Famine in Makkah </FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 45 Al-Jaathiyah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-jathiyah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-jathiyah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 46 Al-Aĥqaaf
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-ahqaf')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-ahqaf')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 47 Muĥammad
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'muhammad')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'muhammad')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 48 Al-Fatĥ
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-fath')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-fath')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 49 Al-Ĥujuraat
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-hujurat')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-hujurat')" > Teachings</FlatButton></li>
                </ul>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">The Sixth Group</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 34)" > Intro to the Sixth Group
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 50 Qaaf
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'qaf')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'qaf')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 51 Adz-Dzaariyaat
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'adz-dazariyah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'adz-dazariyah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 52 Aŧ-Ŧoor
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-tur')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'at-tur')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 53 An-Najm
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-najm')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-najm')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'an-najm')" > Did the Prophet see Allaah?</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 53)" > Who Were Al-Laat, Al-'Uzza <br /> and Manaat? </FlatButton>
                  </li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 54 Al-Qamar
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-qamar')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-qamar')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 55 Ar-Raĥmaan
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ar-rahman')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ar-rahman')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 56 Al-Waaqiʻah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-waqiah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-waqiah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 57 Al-Ĥadeed
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-hadid')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-hadid')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'al-hadid')" > The Problems Caused by <br /> Christian Monasticism </FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 58 Al-Mujaadalah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-mujadilah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-mujadilah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 59 Al-Ĥashr
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-hashr')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-hashr')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 60 Al-Mumtaĥinah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-muhtahanah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-muhtahanah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 61 Aŝ-Ŝaff
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'as-saf')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'as-saf')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'as-saf')" > How Jesus foretold the Advent <br />of Muhammad (ŜAʻWS)</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 62 Al-Jumuʻah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-jumah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-jumah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 63 Al-Munaafiqoon
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-munafiqun')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-munafiqun')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 64 At-Taghaabun
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-taghabun')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'at-taghabun')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 65 Aŧ-Ŧalaaq
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-talaq')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'at-talaq')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 66 At-Taĥreem
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-tahrim')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'at-tahrim')" > Teachings</FlatButton></li>
                </ul>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">The Seventh Group</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 6)" > Intro to the Seventh Group
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 67 Al-Mulk
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-mulk')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-mulk')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 68 Al-Qalam
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-qalam')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-qalam')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 69 Al-Ĥaaqqah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-haqqah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-haqqah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 70 Al-Ma‘aarij
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-mararij')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-mararij')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 71 Nooĥ
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'nuh')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'nuh')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 72 Al-Jinn
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-jinn')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-jinn')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 73 Al-Muzzammil
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-muzammil')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-muzammil')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 74 Al-Muddaththir
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-mudaththir')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-mudaththir')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 75 Al-Qiyaamah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-qiyamah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-qiyamah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 76 Ad-Dahr or Al-Insaan
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-insan')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-insan')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 77 Al-Mursalaat
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-mursalat')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-mursalat')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 78 An-Nabaa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-naba')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-naba')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 79 An-Naazi‘aat
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-naza')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-naza')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 80 ‘Abasa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'abasa')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'abasa')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 81 At-Takweer
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-takwir')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'at-takwir')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 47)" > Treatment of Daughters and <br /> Infantcide in Different Societies</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 82 Al-Infiŧaar
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-infitar')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-infitar')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 83 Al-Muŧaffifeen
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-mutaffifin')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-mutaffifin')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 84 Al-Inshiqaaq
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-inshiqaq')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-inshiqaq')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 85 Al-Burooj
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-buruj')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-buruj')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 86 Aŧ-Ŧaariq
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-tariq')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-tariq')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 87 Al-A‘laa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-ala')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-ala')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 88 Al-Ghaashiyah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-ghashiyah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-ghashiyah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 89 Al-Fajr
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-fajr')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-fajr')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 90 Al-Balad
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-balad')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-balad')" > Teachings</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeA(this,'al-balad')" > Helping the Needy</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 91 Ash-Shams
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'ash-shams')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'ash-shams')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 92 Al-Layl
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-layl')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-layl')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 93 Adh-Dhuhaa
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'adh-dhuba')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'adh-dhuba')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 94 Alam-Nashraĥ or Al-Insharaaĥ
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-inshirah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-inshirah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 95 At-Teen
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-tin')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'at-tin')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 96 Al-‘Alaq
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-alaq')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-alaq')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 97 Al-Qadr
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-qadar')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-qadar')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 98 Al-Bayyinah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-bayinah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-bayinah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 99 Az-Zilzaal
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'az-zalzalah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'az-zalzalah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 100 Al-‘Aadiyaat
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-adiyah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-adiyah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 101 Al-Qaari‘ah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-qari')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-qari')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 102 At-Takaathur
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'at-takathur')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'at-takathur')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 103 Al-‘Aŝr
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-asr')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-asr')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 104 Al-Humazah
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-humazah')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-humazah')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 105 Al-Feel
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-fil')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-fil')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 106 Al-Quraish
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'quraish')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'quraish')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 107 Al-Maa‘oon
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-maun')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-maun')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 108 Al-Kawthar
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-kauthar')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-kauthar')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 109 Al-Kaafiroon
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-kafirun')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-kafirun')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 110 An-Naŝr
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-nasr')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-nasr')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 111 Al-Lahab or Al-Masadd
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-masad')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-masad')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 112 Al-Ikhlaaŝ
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-ikhlas')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-ikhlas')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 113 Al-Falaq
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'al-falaq')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'al-falaq')" > Teachings</FlatButton></li>
                </ul>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this)" > 114 An-Naas
                </FlatButton>
                <ul >
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChange(this,'an-nas')" > Introduction and Background</FlatButton></li>
                  <li><FlatButton className="sidebar-button"  onClick="highlightMeAndChangeT(this,'an-nas')" > Teachings</FlatButton></li>
                </ul>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">Appendices</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 82)" > Can Anyone Produce<br />a Qur-aan-like Chapter?
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 17)" > Evolutionary Change through <br />Successive Commands
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 16)" > Two Major Categories of the <br />Verses of the Qur-aan
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 18)" > Deen
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 58)" > Bid'ah
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 79)" > The Reality About <br /> Predetermination (Taqdeer)
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 19)" > Sunnatullah -- Allaah's Sunnah
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 45)" > The Truth and Lies about <br /> the Battle of Badr
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 20)" > The Qur-aanic Use of the Word <br />"Rooh"
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 21)" > What is the Matter with the Qalb?
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 22)" > What is Meant by the "Nafs" <br />in the Qur-aan
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 24)" > The Islamic View about <br />Intercession (Shafaa‘ah)
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 23)" > The Reality of Israa and Miʻraaj <br />in the Light of the Qur-aan
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 47)" > Treatment of Daughters and <br /> Infantcide in Different Societies
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 53)" > Who Were Al-Laat, Al-'Uzza <br /> and Manaat?
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 39)" > The Sources of the Information <br /> Contained in the Qur-aan
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 76)" > Justice and Mercy of Allaah SWT
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 77)" > Where Shall the Disbelievers <br /> End Up!
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 78)" > Natural Disasters and the <br /> Questions They Raise
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 83)" > Sacrificing an Animal vs. <br /> Paying Money
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 84)" > Can a Muslim be a Vegan?
                </FlatButton>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="highlightMe(this)" >
              <span className="nav-text">About Prophets</span>
            </FlatButton>
            <ul >
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 37)" > Adam The First Human <br /> and the First Muslim
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 65)" > The Story of Nooh
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 54)" > Location of Mount <br /> Al-Judiyy (Judi)
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 70  )" > Noah of the Bible in comparison <br /> with Nooĥ of the Qur-aan
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 55)" > Have the Remnants of Noah’s <br /> Ark been Found?
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 56)" > Hoode and 'Aad of Iram
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 69)" > Thamood and Saalih
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 66)" > Ibraheem -- Allaah's Friend
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 67)" > The Story of Loot
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 64)" > The Story of Yoonus
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 68)" > The Story of Yoosuf
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 60)" > Joseph of the Bible and the <br /> Talmud Compared with Qur-aan
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 62)" > Who Was the King Who Dreamed?
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 57)" > Jewish Mythology about Joseph <br /> and his Brothers
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 48)" > Moosa -- with whom  Allaah spoke
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 49)" > Who Drowned? Pharaohs <br /> &amp; Their Timelines
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 50)" > Which Body of Water <br /> Did Moosa Cross?
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 52)" > Moses' Story in the Qur-aan, <br /> the Bible and the Talmud
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 51)" > Examples of Myths in the Bible <br /> and the Talmud
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 61)" > The Story of Moosa and Khadhir
                </FlatButton>
              </li>
              <li className="submenuitem">
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 59)" > Was Moosa's Speech Impaired?
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 63)" > Maryam
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 72)" > The Story of 'Eesa
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 74)" > Was Muhammad’s Advent Foretold?
                </FlatButton>
              </li>
              <li>
                <FlatButton className="sidebar-button"  onClick="highlightMe(this); getArticleID(this, 75)" > Was Muhammad a Messenger of Allaah?
                </FlatButton>
              </li>
            </ul>
          </li>
          <li >
            <FlatButton className="sidebar-button"  onClick="showGlossary(this);highlightMe(this)" >
              <span className="nav-text">Glossary</span>
            </FlatButton>
          </li>

      </ul>
    );
  }
}

module.exports = withRouter(SidebarContent);
