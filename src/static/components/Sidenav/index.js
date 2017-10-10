import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import APPCONFIG from 'constants/Config';
import {
    toggleCollapsedNav
} from '../../actions';
import SidenavContent from './SidenavContent';
import navLogo from '../../assets/images/tourlogo.png'
import '../styles.scss'



class Sidebar extends React.Component {


  componentDidMount() {
    // AutoCloseMobileNav
    const { history } = this.props;
    const $body = $('#body');

    if (APPCONFIG.AutoCloseMobileNav) {
      history.listen((location) => {
        setTimeout(() => {
          $body.removeClass('sidebar-mobile-open');
        }, 0);
      });
    }
  }

  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    const { handleToggleCollapsedNav } = this.props;
    handleToggleCollapsedNav(val);
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { navCollapsed, colorOption } = this.props;
    let toggleIcon = null;
    if (navCollapsed) {
      toggleIcon = <i className="material-icons">radio_button_unchecked</i>;
    } else {
      toggleIcon = <i className="material-icons">radio_button_checked</i>;
    }

    return (
      <nav
        className={classnames('app-sidebar', {
          'bg-color-light': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0,
          'bg-color-dark': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) < 0 })}
            >
        <section
          className={classnames('sidebar-header', {
            'bg-color-dark': ['11', '31'].indexOf(colorOption) >= 0,
            'bg-color-light': colorOption === '21',
            'bg-color-primary': ['12', '22', '32'].indexOf(colorOption) >= 0,
            'bg-color-success': ['13', '23', '33'].indexOf(colorOption) >= 0,
            'bg-color-info': ['14', '24', '34'].indexOf(colorOption) >= 0,
            'bg-color-warning': ['15', '25', '35'].indexOf(colorOption) >= 0,
            'bg-color-danger': ['16', '26', '36'].indexOf(colorOption) >= 0 })}
                >

                <svg className="logo-img logo-react" viewBox="0 0 3925 3525" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0.000000,3446.000000) scale(0.400000,-0.400000)"
                fill="#d74040" stroke="none">
                <path d="M1555 8383 c-55 -6 -179 -35 -217 -49 -92 -34 -125 -48 -158 -63 -54
                -25 -154 -83 -169 -99 -8 -7 -32 -25 -53 -39 -65 -40 -298 -281 -298 -307 0
                -4 -11 -22 -24 -39 -53 -70 -156 -303 -156 -353 0 -9 -6 -30 -14 -47 -20 -44
                -29 -146 -30 -312 -1 -195 9 -266 60 -430 16 -50 25 -72 64 -155 51 -107 141
                -236 234 -334 53 -55 56 -80 11 -84 -66 -5 -161 -36 -258 -83 -150 -73 -295
                -203 -374 -334 -13 -22 -47 -93 -68 -140 -28 -64 -45 -135 -60 -245 -14 -102
                -15 -281 -12 -1545 3 -1240 5 -1441 19 -1515 37 -202 127 -372 269 -505 99
                -93 168 -138 279 -182 184 -73 185 -73 1426 -73 1017 0 1092 -1 1098 -17 4
                -10 -1 -28 -14 -45 -11 -15 -20 -30 -20 -33 0 -3 -24 -40 -53 -83 -29 -42 -66
                -99 -82 -126 -39 -64 -44 -71 -90 -141 -22 -33 -42 -64 -45 -70 -6 -13 -136
                -212 -161 -247 -10 -15 -19 -29 -19 -32 0 -3 -20 -34 -45 -70 -25 -37 -45 -68
                -45 -70 0 -3 -20 -34 -45 -70 -25 -37 -45 -68 -45 -71 0 -2 -15 -25 -32 -51
                -30 -41 -33 -53 -33 -118 0 -60 4 -76 23 -101 48 -61 131 -81 203 -51 40 17
                62 40 111 116 19 30 61 96 94 145 32 50 61 94 63 99 2 4 23 37 47 72 24 35 44
                66 44 69 0 3 20 34 45 71 25 36 45 67 45 69 0 2 19 32 42 67 48 71 64 96 74
                118 4 8 10 17 13 20 10 8 51 69 51 74 0 3 20 35 45 72 25 36 45 67 45 70 0 2
                20 33 45 70 25 36 45 68 45 72 0 4 12 20 27 36 l27 29 28 -34 c15 -18 28 -39
                28 -45 0 -7 3 -14 8 -16 9 -4 52 -65 52 -74 0 -3 13 -23 28 -43 16 -20 32 -43
                36 -51 11 -24 29 -53 56 -90 27 -37 45 -66 56 -90 4 -8 19 -31 34 -50 15 -19
                30 -42 34 -50 11 -24 29 -53 56 -90 27 -37 45 -66 56 -90 4 -8 20 -31 36 -51
                15 -20 28 -40 28 -43 0 -4 9 -19 19 -34 25 -35 155 -234 161 -247 16 -33 81
                -123 101 -142 89 -82 249 -37 274 77 9 42 -3 126 -21 141 -8 6 -14 16 -14 21
                0 8 -38 67 -51 78 -3 3 -9 12 -13 20 -10 22 -24 44 -101 160 -39 58 -72 109
                -74 115 -2 5 -24 38 -48 73 -23 35 -43 65 -43 68 0 2 -20 33 -45 70 -25 36
                -45 67 -45 69 0 2 -19 32 -42 67 -48 71 -64 96 -74 118 -4 8 -20 31 -36 51
                -15 20 -28 39 -28 43 0 3 -22 39 -50 79 -27 41 -50 83 -50 95 l0 22 1133 4
                c715 2 1156 7 1197 14 191 30 362 122 512 273 89 90 178 246 212 374 14 52 36
                206 36 257 0 31 36 30 102 -3 34 -17 77 -37 93 -44 86 -38 272 -122 390 -175
                69 -32 150 -69 210 -95 17 -7 62 -28 100 -45 39 -17 84 -37 100 -45 17 -7 62
                -27 100 -45 39 -18 84 -38 100 -45 29 -13 80 -36 228 -104 37 -17 69 -31 72
                -31 5 0 83 -36 203 -92 55 -26 79 -32 139 -32 82 -1 113 15 145 74 18 34 18
                103 16 2090 -3 2263 2 2070 -63 2122 -24 19 -42 23 -95 23 -42 0 -79 -6 -101
                -17 -19 -9 -63 -30 -99 -46 -36 -16 -95 -43 -132 -61 -37 -17 -71 -31 -75 -31
                -5 0 -35 -13 -68 -29 -55 -27 -158 -74 -230 -106 -16 -7 -61 -27 -100 -45 -38
                -17 -83 -38 -100 -45 -185 -82 -230 -103 -305 -137 -78 -36 -123 -56 -170 -76
                -19 -8 -42 -19 -50 -24 -8 -4 -22 -11 -30 -14 -8 -3 -43 -19 -77 -35 -35 -16
                -66 -29 -70 -29 -7 0 -96 -41 -165 -76 -53 -28 -67 -18 -73 49 -2 23 -7 74
                -11 112 -3 39 -12 85 -20 104 -8 18 -14 40 -14 48 0 26 -88 191 -133 250 -89
                116 -209 218 -317 269 -79 38 -182 72 -255 83 -51 8 -55 28 -13 73 100 108
                185 224 227 308 12 25 26 52 30 60 4 8 15 31 23 50 14 32 21 57 62 203 38 135
                41 458 6 597 -20 78 -52 187 -64 215 -27 64 -72 150 -103 197 -18 27 -33 53
                -33 58 0 5 -3 10 -7 12 -5 2 -40 41 -80 88 -80 96 -134 146 -242 225 -103 76
                -295 169 -401 195 -19 5 -55 14 -80 21 -30 9 -122 13 -275 13 -236 1 -331 -10
                -423 -50 -18 -8 -38 -14 -44 -14 -24 0 -209 -92 -255 -126 -17 -13 -36 -24
                -42 -24 -5 0 -14 -6 -18 -13 -4 -7 -36 -34 -69 -60 -186 -141 -361 -402 -427
                -637 -46 -161 -48 -178 -44 -405 2 -131 9 -240 16 -270 21 -85 43 -159 57
                -192 30 -72 47 -109 55 -123 5 -8 13 -24 18 -35 21 -46 122 -185 177 -244 34
                -37 59 -72 59 -85 l0 -21 -800 0 c-914 0 -847 -8 -758 89 176 191 268 369 328
                641 22 100 21 424 -1 520 -25 110 -45 178 -60 208 -8 16 -14 37 -14 47 0 9 -7
                23 -15 30 -8 7 -15 21 -15 31 0 10 -4 20 -9 24 -6 3 -20 27 -33 53 -57 119
                -219 300 -363 407 -101 75 -100 75 -220 133 -141 68 -205 89 -360 112 -57 9
                -346 11 -410 3z m409 -342 c32 -5 63 -14 69 -20 6 -6 21 -11 33 -11 12 0 35
                -6 51 -14 15 -8 46 -23 68 -33 63 -29 175 -107 230 -161 156 -151 222 -254
                286 -442 31 -93 32 -98 32 -280 0 -191 -6 -228 -57 -367 -85 -228 -322 -468
                -556 -560 -171 -68 -451 -84 -620 -36 -142 40 -205 71 -330 164 -131 98 -236
                222 -309 365 -82 163 -117 383 -87 560 26 153 59 246 130 372 50 88 168 214
                291 309 85 66 287 152 360 154 17 0 39 4 50 9 25 12 279 5 359 -9z m3410 8
                c229 -40 377 -121 547 -296 105 -109 135 -150 192 -268 43 -90 62 -155 83
                -289 16 -103 16 -115 -1 -240 -10 -72 -29 -160 -42 -196 -14 -36 -27 -74 -30
                -85 -3 -11 -11 -27 -17 -35 -7 -8 -17 -26 -23 -40 -14 -34 -105 -154 -162
                -213 -68 -72 -196 -167 -276 -205 -159 -76 -208 -85 -425 -86 -202 -1 -220 2
                -355 51 -221 82 -437 283 -542 503 -77 162 -87 210 -87 425 0 153 3 199 17
                235 9 25 17 51 17 58 0 23 52 137 90 197 14 22 27 45 30 52 17 40 168 194 250
                257 67 50 82 59 140 86 25 12 58 28 73 35 16 8 37 15 47 15 10 0 31 7 46 15
                16 8 45 15 64 16 19 0 44 4 55 9 29 12 238 12 309 -1z m754 -2313 c124 -24
                260 -109 344 -216 40 -51 98 -170 98 -201 0 -11 5 -29 10 -39 15 -28 14 -2974
                -1 -3037 -11 -46 -32 -100 -50 -133 -5 -8 -14 -26 -19 -39 -21 -47 -172 -186
                -240 -220 -130 -65 43 -61 -2788 -61 -2661 0 -2668 0 -2737 38 -11 6 -27 13
                -35 17 -53 21 -149 96 -197 153 -51 60 -113 173 -113 205 0 12 -6 29 -13 35
                -16 17 -23 2937 -7 3016 6 28 14 64 17 79 8 40 59 133 103 189 85 108 212 188
                335 213 92 19 5195 20 5293 1z m2473 -279 c12 -44 9 -3380 -3 -3394 -16 -19
                -37 -16 -108 18 -36 17 -78 37 -95 44 -16 8 -59 27 -95 43 -80 37 -224 101
                -305 137 -16 7 -60 27 -97 44 -38 17 -98 45 -135 62 -38 17 -84 38 -103 46
                -19 8 -48 21 -65 28 -16 7 -37 16 -45 19 -8 3 -22 10 -30 15 -15 9 -70 34
                -125 57 -16 7 -61 27 -100 44 -73 33 -84 39 -200 90 -38 17 -90 41 -115 54
                l-45 22 -3 973 c-1 659 1 978 8 992 6 10 16 19 23 19 6 0 39 13 72 29 128 61
                195 91 199 91 3 0 44 18 93 41 48 22 108 50 133 61 25 11 74 34 110 50 36 16
                80 36 98 44 17 8 47 20 65 28 17 8 64 29 102 46 39 17 86 38 105 47 19 8 42
                19 50 24 8 5 22 12 30 15 8 3 30 12 48 20 17 8 47 20 65 28 45 20 151 68 217
                98 30 14 80 36 110 48 30 13 62 29 70 37 25 23 63 12 71 -20z"/>
                <path d="M2825 5335 c-22 -8 -51 -15 -63 -15 -54 0 -294 -96 -377 -150 -16
                -11 -37 -23 -45 -27 -30 -13 -127 -93 -196 -161 -155 -152 -253 -313 -331
                -541 -10 -29 -24 -56 -31 -59 -8 -3 -28 11 -45 30 -102 111 -283 203 -432 219
                -200 21 -319 -38 -401 -200 -15 -30 -31 -71 -36 -90 -5 -20 -14 -54 -21 -76
                -6 -24 -11 -125 -11 -250 -1 -175 2 -221 17 -275 18 -63 40 -119 58 -150 5 -8
                12 -22 16 -30 12 -27 54 -73 96 -105 121 -90 305 -86 502 13 46 23 129 79 160
                108 16 14 36 24 49 22 20 -3 21 -9 29 -197 6 -137 12 -202 22 -222 8 -15 15
                -38 15 -50 0 -36 33 -132 80 -234 101 -217 297 -435 495 -551 27 -16 59 -34
                70 -41 11 -7 27 -15 35 -18 32 -13 86 -37 113 -51 16 -8 38 -14 48 -14 11 0
                30 -5 42 -12 67 -36 161 -41 791 -45 595 -3 624 -3 719 17 55 12 108 25 118
                30 10 6 27 10 38 10 10 0 32 6 48 14 15 8 73 36 128 62 202 96 400 278 521
                479 37 61 91 174 100 209 3 15 10 29 15 32 5 3 9 15 9 27 0 12 7 35 15 51 8
                15 15 39 15 52 0 13 7 49 15 81 10 39 15 106 15 209 0 112 3 154 13 162 15 12
                25 6 127 -70 34 -27 68 -48 74 -48 7 0 17 -5 24 -12 29 -29 208 -78 288 -78
                64 0 157 24 185 47 8 7 19 13 23 13 22 0 121 136 145 200 40 109 52 201 48
                390 -3 127 -9 207 -20 253 -36 148 -123 271 -223 317 -68 32 -242 33 -330 2
                -139 -49 -222 -98 -316 -188 -40 -38 -50 -44 -66 -35 -13 7 -23 26 -27 53 -4
                24 -14 52 -21 63 -8 11 -14 25 -14 32 0 11 -55 129 -83 178 -138 240 -385 450
                -641 547 -92 35 -140 50 -186 58 -25 5 -63 13 -85 19 -26 7 -255 10 -660 10
                -514 0 -627 -2 -660 -14z m1330 -148 c297 -65 516 -203 703 -443 18 -23 32
                -45 32 -49 0 -4 12 -24 28 -44 15 -20 35 -54 46 -76 10 -22 22 -48 27 -57 14
                -28 38 -98 60 -173 22 -80 38 -357 39 -689 0 -298 -19 -465 -66 -574 -8 -18
                -14 -37 -14 -42 0 -10 -63 -143 -83 -175 -76 -123 -203 -259 -324 -349 -89
                -66 -290 -166 -334 -166 -11 0 -30 -5 -42 -12 -12 -6 -48 -14 -82 -18 -33 -5
                -102 -13 -152 -20 -88 -12 -163 -8 -163 8 0 12 50 62 61 62 17 0 122 85 158
                128 35 43 47 62 78 127 45 93 47 106 53 330 l5 220 211 210 c258 258 280 286
                339 445 23 62 24 301 1 345 -9 17 -16 37 -16 46 0 8 -7 24 -15 35 -8 10 -15
                25 -15 32 -1 38 -282 342 -317 342 -7 0 -13 3 -13 8 0 8 -68 40 -145 69 -72
                26 -311 26 -375 0 -117 -48 -175 -85 -243 -153 -40 -39 -82 -73 -94 -76 -17
                -5 -39 10 -103 71 -75 72 -127 104 -245 156 -49 22 -251 30 -335 14 -122 -24
                -218 -85 -365 -234 -91 -92 -117 -126 -149 -191 -21 -43 -42 -87 -47 -96 -5
                -10 -9 -30 -9 -45 0 -15 -5 -53 -12 -84 -10 -48 -9 -74 4 -151 15 -88 30 -144
                49 -178 4 -8 17 -34 29 -56 12 -25 113 -135 248 -270 l227 -228 6 -195 c7
                -206 11 -241 36 -306 33 -88 54 -123 123 -208 22 -27 121 -103 145 -111 11 -4
                28 -17 38 -31 17 -23 17 -25 -2 -35 -28 -15 -337 16 -378 38 -12 7 -32 12 -45
                12 -13 0 -32 7 -42 15 -11 8 -26 15 -33 15 -11 0 -122 52 -181 84 -56 32 -223
                169 -258 213 -21 26 -51 61 -66 77 -16 17 -28 34 -28 39 0 4 -11 23 -24 40
                -30 42 -65 111 -110 219 -34 83 -45 124 -66 263 -11 69 -12 627 -1 665 4 14 3
                49 -2 77 -7 41 -4 82 13 180 11 71 25 132 31 138 5 5 9 17 9 27 0 19 16 57 66
                163 58 119 117 199 233 315 141 141 302 233 511 294 99 29 228 34 775 31 440
                -2 553 -5 610 -18z m-1081 -612 c15 -8 35 -15 43 -15 42 0 136 -72 270 -207
                57 -57 106 -103 109 -103 3 0 68 60 143 133 127 124 198 177 239 177 9 0 26 7
                36 15 27 21 190 21 230 0 15 -8 34 -15 40 -15 17 0 82 -34 123 -66 19 -15 77
                -69 128 -121 135 -137 179 -231 177 -382 0 -46 -6 -89 -11 -94 -6 -6 -11 -20
                -11 -32 -1 -11 -12 -38 -25 -60 -14 -22 -29 -49 -34 -60 -12 -25 -454 -465
                -468 -465 -7 0 -12 -82 -15 -237 -3 -135 -9 -249 -15 -263 -6 -14 -19 -45 -29
                -70 -20 -51 -71 -118 -128 -169 -103 -94 -200 -117 -449 -107 -109 4 -153 9
                -169 21 -13 8 -29 15 -36 15 -40 0 -176 122 -207 187 -9 18 -20 35 -25 38 -6
                3 -10 14 -10 24 0 10 -7 32 -15 47 -12 23 -15 75 -15 265 l0 236 -38 27 c-21
                14 -133 122 -248 238 -159 160 -217 225 -234 263 -12 28 -27 59 -33 70 -6 11
                -13 63 -15 117 -4 99 8 154 54 248 26 53 261 283 315 308 25 12 50 22 56 22 6
                0 24 7 39 15 19 10 58 15 114 15 56 0 95 -5 114 -15z m-1768 -70 c157 -23 361
                -174 435 -324 31 -62 33 -72 32 -171 -1 -83 -5 -112 -20 -140 -24 -45 -53 -90
                -75 -115 -10 -11 -23 -27 -30 -37 -39 -50 -226 -168 -266 -168 -10 0 -27 -7
                -38 -15 -30 -23 -155 -20 -203 5 -44 22 -98 73 -112 104 -5 12 -13 28 -18 36
                -19 33 -34 89 -44 165 -20 145 -9 380 19 437 8 15 14 34 14 43 0 25 68 122
                103 147 30 22 122 49 143 43 6 -2 33 -7 60 -10z m4527 -6 c64 -17 167 -142
                167 -201 0 -9 7 -32 15 -51 22 -54 21 -402 -1 -472 -46 -139 -83 -194 -158
                -232 -112 -57 -297 -4 -465 132 -13 11 -34 31 -45 44 -12 13 -28 31 -37 40
                -27 27 -76 115 -82 146 -3 17 -11 51 -18 77 -11 41 -10 56 6 105 33 106 57
                146 144 233 70 69 103 94 176 130 120 59 210 74 298 49z"/>
                <path d="M3914 4245 c-23 -7 -55 -21 -70 -31 -41 -25 -124 -114 -124 -133 0
                -9 -7 -25 -15 -35 -11 -14 -15 -47 -15 -114 0 -86 3 -100 32 -159 29 -60 106
                -143 133 -143 6 0 24 -7 40 -16 20 -11 59 -16 121 -17 74 -1 99 3 137 21 62
                29 147 102 147 126 0 5 6 17 13 25 38 44 49 173 24 259 -52 173 -246 273 -423
                217z m203 -185 c47 -34 66 -81 61 -149 -5 -65 -25 -98 -80 -130 -40 -23 -126
                -29 -145 -10 -6 6 -21 16 -34 23 -34 17 -68 84 -68 136 0 55 38 116 89 143 49
                25 134 19 177 -13z"/>
                <path d="M2825 4210 c-72 -35 -128 -94 -162 -169 -21 -49 -24 -67 -20 -141 4
                -102 21 -147 76 -211 58 -67 168 -119 251 -119 100 1 222 66 274 145 87 134
                88 253 3 386 -29 44 -105 109 -129 109 -7 0 -22 7 -32 15 -14 11 -46 15 -110
                15 -79 -1 -99 -5 -151 -30z m236 -162 c46 -36 88 -100 89 -135 0 -30 -34 -94
                -68 -125 -31 -29 -100 -57 -122 -51 -74 22 -114 53 -141 105 -24 46 -24 88 -1
                131 56 106 160 138 243 75z"/>
                <path d="M3293 3348 c-36 -17 -45 -84 -15 -111 25 -22 75 -21 95 1 17 19 22
                68 9 88 -8 13 -47 34 -59 33 -4 0 -18 -5 -30 -11z"/>
                <path d="M3628 3344 c-23 -12 -28 -21 -28 -53 0 -45 24 -71 66 -71 45 1 64 21
                64 68 0 36 -4 44 -30 57 -35 18 -38 18 -72 -1z"/>
                <path d="M3185 2948 c4 -18 11 -37 16 -42 5 -6 9 -20 9 -32 0 -12 7 -27 15
                -34 8 -7 15 -17 15 -23 0 -14 74 -76 119 -101 55 -29 220 -28 277 3 52 27 107
                80 129 123 23 45 45 120 39 130 -3 4 -36 8 -74 8 l-70 0 -19 -39 c-24 -46 -68
                -85 -115 -101 -29 -9 -41 -8 -79 9 -46 21 -107 86 -107 115 0 13 -13 16 -81
                16 l-81 0 7 -32z"/>
                <path d="M1158 4215 c-10 -13 -18 -31 -18 -40 0 -9 29 -45 66 -81 46 -46 63
                -70 60 -82 -4 -10 -33 -46 -67 -80 -67 -69 -72 -92 -28 -125 36 -26 62 -16
                126 49 30 31 61 54 73 54 12 0 43 -23 73 -54 62 -63 88 -74 122 -52 43 28 34
                68 -29 132 -30 29 -57 62 -60 72 -5 14 10 36 54 81 65 67 76 103 42 134 -34
                31 -63 21 -125 -43 -31 -33 -66 -60 -76 -60 -10 0 -46 27 -80 60 -69 68 -103
                77 -133 35z"/>
                <path d="M5417 4222 c-32 -35 -21 -66 43 -128 33 -33 60 -67 60 -77 0 -10 -27
                -45 -60 -79 -69 -69 -78 -104 -34 -133 36 -23 69 -8 134 61 28 30 55 54 60 54
                5 0 34 -24 65 -53 77 -74 97 -84 130 -63 44 29 34 67 -35 141 -33 35 -60 68
                -60 71 0 4 27 35 60 70 43 44 60 70 60 89 0 43 -17 65 -50 65 -23 0 -43 -13
                -88 -60 -33 -33 -68 -60 -78 -60 -11 0 -46 27 -79 60 -64 65 -98 76 -128 42z"/>
                </g>
                </svg>


          <Link to="/" className="brand">{APPCONFIG.brand}</Link>
          <a href="javascript:;" className="collapsednav-toggler" onClick={this.onToggleCollapsedNav}>
            {toggleIcon}
          </a>
        </section>

        <section className="sidebar-content">
          <SidenavContent />
        </section>

        <section className="sidebar-footer">
          <ul className="nav">
            <li>
              <a target="_blank" href="http://tourmonkeys.com">
                <i className="nav-icon material-icons">help</i>
                <span className="nav-text"><span>Help</span> & <span>Support</span></span>
              </a>
            </li>
          </ul>
        </section>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  navCollapsed: state.settings.navCollapsed,
  colorOption: state.settings.colorOption
});

const mapDispatchToProps = dispatch => ({
  handleToggleCollapsedNav: (isNavCollapsed) => {
    dispatch(toggleCollapsedNav(isNavCollapsed));
  },
});

module.exports = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar));
