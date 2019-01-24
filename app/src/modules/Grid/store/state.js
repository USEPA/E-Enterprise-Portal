
const sample = [
  {
    componentName: 'BeWellInformed',
    eepApp: {
      id: 'be-well-informed',
      title: 'Be Well Informed',
      source: [
        {
          text: 'New Hampshire’s Be Well Informed Guide',
          link: 'https://xml2.des.state.nh.us/DWITool/Welcome.aspx',
        },
        {
          text: 'NH’s Be Well Informed Guide',
          link: 'https://xml2.des.state.nh.us/DWITool/Welcome.aspx',
        },
      ],
      html: {
        mainCard:
          '<p>Have a well and wonder what your water testing results mean?</p>\n' +
          '<p>\n' +
          '  Be Well Informed lets you enter your test results and get feedback about health\n' +
          '  concerns and water treatment choices. Be Well Informed includes useful information about\n' +
          '  the most common contaminants that affect wells.\n' +
          '</p>\n' +
          '<p>\n' +
          '  A quick disclaimer before we start: Information provided by the participating States\n' +
          '  is for informational purposes only. It is recommended that you consult a qualified water\n' +
          '  treatment professional if you need to treat your water. They can consider other\n' +
          '  conditions or factors related to your well or home to determine the most appropriate\n' +
          '  water treatment option.\n' +
          '</p>\n' +
          '<p class="widget-note powered-by-nhbwi">Modeled After:\n' +
          '  <a\n' +
          '    href="https://xml2.des.state.nh.us/DWITool/Welcome.aspx"\n' +
          '    target="_blank">New Hampshire’s Be <em>Well</em> Informed Guide</a>\n' +
          '</p>',
      },
      isExpandable: false,
      grid: {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      },
      iconName: 'bookmark.svg',
    },
  },
  {
    componentName: 'TrendingAir',
    eepApp: {
      id: 'trending-air',
      title: 'Trending Air',
      source: [
        {
          text: 'US Environmental Protection Agency',
          link: 'https://www.epa.gov/',
        },
      ],
      html: {
        mainCard: '',
      },
      isExpandable: true,
      grid: {
        x: 1,
        y: 0,
        w: 1,
        h: 1,
      },
      iconName: 'bookmark.svg',
    },
  },
  {
    componentName: 'FavoriteLinks',
    eepApp: {
      id: 'favorite-links',
      title: 'Favorite Links',
      source: [
        {
          text: 'US Environmental Protection Agency',
          link: 'https://www.epa.gov',
        },
      ],
      html: {
        mainCard:
          ' <p>Save links you find in E-Enterprise to return to them later.</p>',
      },
      isExpandable: true,
      grid: {
        x: 0,
        y: 1,
        w: 2,
        h: 2,
      },
      iconName: 'bookmark.svg',
    },
  },
  {
    componentName: 'MyReporting',
    eepApp: {
      id: 'my-reporting',
      title: 'My Reporting',
      source: [
        {
          text: 'US Environmental Protection Agency',
          link: 'https://www.epa.gov/',
        },
      ],
      html: {
        mainCard:
          '<p>Report directly to your CDX data flows.</p>',
      },
      isExpandable: true,
      grid: {
        x: 2,
        y: 1,
        w: 2,
        h: 2,
      },
      iconName: 'bookmark.svg',
    },
  },
];
/**
 * Values added here are available to all workbench applications.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

export default {
  // @todo Remove POC "user" and add meaningful intial state values
  layout: [],
  sampleLayout: sample,
};
