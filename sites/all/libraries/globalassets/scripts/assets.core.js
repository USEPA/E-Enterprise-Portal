//adding comment to test connection between assets-web and global assets

/*******************************************************************************
   Minimum Dependencies: JQuery, JQueryUI JS/CSS, Bootstrap JS/CSS
********************************************************************************/
var debugON = false;
/*******************************************************************************
    Required assistive technology text, can be abstracted for bi-lingual support
********************************************************************************/
var exitText = '<span class="sr-only"> opens a new tab</span>',
    //insert same span but with visible image on page
    exitTextImage = '<span class="fa fa-external-link fa-spacing"><span class="adobeBlank" aria-hidden="true">New Window icon</span></span><span class="sr-only">This link opens a new window or tab</span>',
    //policy text
    policyText = '<a href="http://www.medicare.gov/sharedresources/shared/pages/external-link-disclaimer.aspx" class="fa fa-external-link non-gov-notice" title="Medicare\' External Link Policy" target="_blank"><span class="adobeBlank">New Window icon</span></a>',
    //use hidden text to note where user is located
    youAreHere = '<span class="hiddenText">You are here</span>',
    //add ARIA attributes to mobile navigation and remove if screen size is adjusted above mobile screen size
    mobileDropdownUl = jQuery('#topNavList').find('.navbar-nav'),
    //variable to find accordion header text
    headerTitle;


/*************************************************************************
    Namespaced method to use in conjunction with jQuery extension methods.
**************************************************************************/
var A11y = {
    Core: function() {
        //add sr only text for links that open in new window
        this.externalWindow();

        //add external policy link
        this.externalPolicy();

        //add proper headings 
        this.headings();

        //add proper font iconts
        this.fontIcons();


        /*******************************************
            find focusable item when page changes
        *******************************************/
        var focusable = jQuery('html').find().first(':focusable');

        /*******************************************
            framebuster
        ********************************************/
        //hide content on page load, can be any element
        jQuery(".container").hide();
        if (window.self === window.top) {
            //show content if not in a frame
            jQuery(".container").show();
        } else {
            //reloads the page to show without frame.
            top.location = self.location;
        }

        /*******************************************
            Live Regions
        ********************************************/
        //add live region for anything to use for announcements to screen readers
        if (jQuery('#liveText').length === 0) {
            jQuery('body').prepend('<div id="liveText" class="sr-only" aria-live="assertive"></div>');
            jQuery('body').prepend('<div id="liveText-polite" class="sr-only" aria-live="polite"></div>');
        }

        /*******************************************
            Mark up presentation tables
        ********************************************/
        // Add attr to presentation tables; for accessibility
        if (!jQuery('.table-presentation').attr('role')) {
            jQuery('.table-presentation').attr('role', 'presentation');
        }

        /*******************************************
            Add global Language if not defined
        ********************************************/
        var htmlAttr = jQuery("html").attr('lang');

        // For some browsers, `attr` is undefined;
        if (typeof htmlAttr === typeof undefined || htmlAttr === false) {
            jQuery('html').attr('lang', 'en-US');
        }

    },
    accordionHelper: function() {
        //toggle accordion header collapsed/expanded status
        jQuery('.ui-accordion-header').find('.sr-section-alert').text(function() {
            return (jQuery(this).parent().hasClass('ui-accordion-header-active')) ? jQuery(this).text().replace('collapsed', 'expanded') : jQuery(this).text().replace('expanded', 'collapsed');
        });
        //toggle accordion header collapsed/expanded icon status
        jQuery('.ui-accordion-header').find('.arrow-icon').text(function() {
            return (jQuery(this).parent().hasClass('fa-caret-down')) ? jQuery(this).text().replace('Collapsed', 'Expanded') : jQuery(this).text().replace('Expanded', 'Collapsed');
        });

    },
    //accordion 508
    accordion: function(el) {

        el.on("accordioncreate", function() {
            //change aria live to active header on selection --- added keyup for spacebar functionality 
            jQuery('.ui-accordion-header').removeAttr("aria-live").next('div').removeAttr('aria-live').attr('aria-expanded', 'false');
            jQuery('.ui-accordion-header').find('.ui-accordion-header-icon').attr({
                'role': 'presentation',
                'aria-hidden': true
            });
            jQuery('.ui-accordion-header-active').next('div').attr('aria-live', 'polite');

            jQuery('.ui-accordion-header').append('<span class="sr-only sr-section-alert"> section is collapsed</span>').children('.ui-accordion-header-icon');
            if (jQuery('html').hasClass('ui-helper-nocustomfonts') && (jQuery('html').hasClass('lt-ie9') || jQuery('html').hasClass('ie9') || jQuery('html').hasClass('ie10') || jQuery('html').hasClass('ie11'))) {
                jQuery('.ui-accordion-header').append('<span class="sr-only sr-section-alert"> section is collapsed</span>').children('.ui-accordion-header-icon').html('<span class="adobeBlank arrow-icon" aria-hidden="true">Collapsed arrow icon</span>');
            }
            A11y.accordionHelper();

        });
        el.on("accordionbeforeactivate", function(event) {
            //make changes before new tab is opened so screen reader announces the changes
            var activeHeader = jQuery(event.target).attr('id');

            jQuery('.ui-accordion-header').find('.sr-section-alert').text(function() {
                return (activeHeader) ? jQuery(this).text().replace('collapsed', 'expanded') : jQuery(this).text().replace('expanded', 'collapsed');
            });


        });
        //change Expand collapse due to collapsible bug with aria expanded
        el.on("accordionactivate", function() {
            var activeContent = jQuery(this).find('.ui-accordion-content-active');
            jQuery(this).children().each(function() {
                A11y.accordionHelper();
            });
            jQuery('.ui-accordion').find('.ui-accordion-header-active').attr({
                'aria-expanded': true,
                'aria-selected': true
            });
            //activeContent.focus();
        });
    },

    //alert 508
    alerts: function() {
        //Close alert and return focus to last focused element
        jQuery("body").on("click", ".close", function() {
            jQuery(this).blur();
            jQuery(this).closest(".alert").fadeOut("slow");
            jQuery(this).parent().prev().focus();
            jQuery(this).closest(".alert").delay(1500).remove();
        });
    },

    //autocomplete 508
    autocomplete: function() {
        //add a half second delay to when autocomplete suggestion shows for screen reader
        jQuery(".ui-autocomplete-input").attr("aria-controls", "list").attr("aria-haspopup", "true");

        /*jQuery(".ui-autocomplete-input").on("click", function(){
             jQuery('html,body').animate({
                scrollTop: jQuery(this).offset().top
            }, 1000);
        });*/

        jQuery(".ui-autocomplete-input").on("autocompleteselect", function(event, ui) {
            jQuery('#liveText').html(ui.item ? 'Selected: ' + ui.item.value : 'Nothing selected');
        });

    },
    bindSkipNav: function(e) {
        e.preventDefault();
        var target = jQuery(e.target).attr('href');
        jQuery(target).focus();
    },

    //block UI 508
    block: function(el, enable) {
        //adding structure for jquery ui dialog
        if (jQuery(".blockUI")) {
            if (enable) {
                jQuery('.wrapper').attr('aria-hidden', 'true');
                jQuery('#liveText').html('Processing Started. Please wait');

                setTimeout(function() {
                    jQuery(".blockUI").attr({
                        tabindex: "-1",
                        width: "auto"
                    });
                }, 10); //set tabindex to -1 after title receives focus
            } else {
                jQuery('.wrapper').attr('aria-hidden', 'false');
                jQuery('#liveText').html('Processing Completed');
            }

        }

    },

    // Custom input
    customInput: function() {
        jQuery('input[type=checkbox], input[type=radio]').each(function() {
            var input = jQuery(this);

            // get the associated label using the input's id
            var label = jQuery('label[for=' + input.attr('id') + ']');


            // add disabled class for disabled inputs
            if (input.attr('disabled')) label.addClass('disabled');
        });
    },

    carousel: function() {
        //show-hide prev/next buttons and change focus for when each is hidden
        jQuery('#myCarousel').carousel({
            interval: false,
            wrap: false
        }).on('slid.bs.carousel', function() {
            var pages = jQuery(this).find("ul.item");
            var currentPage = pages.filter(".active");
            var currentIndex = pages.index(currentPage) + 1;
            var lrUpdate = "Showing Carousel page " + currentIndex + " of " + pages.length;
            jQuery(".myCarousel-liveRegion").text(lrUpdate);

            var jQuerythis = jQuery(this);
            jQuerythis.children('.carousel-control').show();
            if (jQuery('.carousel-inner .item:first').hasClass('active')) {
                jQuerythis.children('.left.carousel-control').hide();
                //focus on first li a of first ul in carousel when the prev navigation button is hidden
                jQuery('.carousel-inner .item:first').find('li:first>a').focus();

            } else if (jQuery('.carousel-inner .item:last').hasClass('active')) {
                jQuerythis.children('.right.carousel-control').hide();
                //focus on last li a of last ul in carousel when the next navigation button is hidden
                jQuery('.carousel-inner .item:last').find('li:last>a').focus();
            }
        });
        jQuery('.left.carousel-control').hide();
        jQuery('.right.carousel-control').show();
    },

    //datatables 508
    datatables: function() {

        //for datatables, add first and second columns into sr only description of row edit/remove buttons
        /*jQuery('.rowActionBtn').each(function(index, element) {
            var firstColumn = jQuery(this).closest('tr').children(':first-child').text().trim();
            var lastColumn = jQuery(this).closest('tr').children(':nth-child(2)').text().trim();
            jQuery(this).children(".actionRowNum").html(firstColumn + ' ' + lastColumn);
            jQuery('.paginate_enabled_previous, .paginate_enabled_next').css('cursor', 'pointer');
         });*/
        jQuery('.previous, .next').on('click', function() {
            jQuery('.rowActionBtn').each(function(index, element) {
                var firstColumn = jQuery(this).closest('tr').children(':first-child').text().trim();
                var lastColumn = jQuery(this).closest('tr').children(':nth-child(2)').text().trim();
                jQuery(this).children(".actionRowNum").html(firstColumn + ' ' + lastColumn);
            });

        });
        //copy abbr from li and place on child anchor for screen reader
        jQuery(".dataTable th").each(function(index, element) {
            jQuery(this).attr('aria-label', jQuery(this).attr('abbr'));
        });
        //data tables remove action link in header and replace with P tag
        if (jQuery(".dataTable th").hasClass('sorting_disabled')) {
            //data tables remove action link in header and replace with P tag
            var alertItem = jQuery('.sorting_disabled').children('a').text();
            jQuery(".sorting_disabled").children("a").delay(100).replaceWith("<p class='fauxLinkHeader'>" + alertItem + "</p>");
            jQuery(".fauxLinkHeader").css({
                'font-size': '1em',
                'line-height': '1.125em',
                'margin-bottom': '0',
                'text-decoration': 'underline',
                'cursor': 'context-menu'
            });
        }
        jQuery(".fa-trash-o").attr("style", "font-family :'FontAwesome' !important").html("<span class='adobeBlank'>Delete icon </span>");
        //change text for save button also
        jQuery('.dataTable').on('click', '.rowActionBtn.save', function() {
            jQuery('#liveText').text('Changes Saved');
            setTimeout(function() {
                jQuery('#liveText').text('');
            }, 1000);
            jQuery(this).closest('tr').find('.edit').focus();
        });
        jQuery('.dataTable').on('click', '.rowActionBtn.edit', function() {
            var firstColumn = jQuery(this).closest('tr').children(':first-child').find('input').val();
            var lastColumn = jQuery(this).closest('tr').children(':nth-child(2)').find('input').val();
            if (debugON) console.log(firstColumn);
            jQuery(this).children(".actionRowNum").text(firstColumn + ' ' + lastColumn);

            jQuery('#liveText').text('Editing ' + firstColumn + ' ' + lastColumn);
            setTimeout(function() {
                jQuery('#liveText').text('');
            }, 1000);
            // wait 1 second to remove message to existing live region
        });
        jQuery('.dataTable').on('click', '.rowActionBtn.delete', function() {
            var firstColumn = jQuery(this).closest('tr').children(':first-child').find('input').val();
            var lastColumn = jQuery(this).closest('tr').children(':nth-child(2)').find('input').val();
            if (debugON) console.log(firstColumn);
            jQuery(this).children(".actionRowNum").text(firstColumn + ' ' + lastColumn);

            jQuery('#liveText').text('Deleted row');
            setTimeout(function() {
                jQuery('#liveText').text('');
            }, 10000);
            // wait 1 second to remove message to existing live region
        });
        //remove links which are disabled from tab order 
        jQuery('.dataTables_paginate a').each(function() {
            if (jQuery(this).hasClass('disabled')) {
                jQuery(this).attr('tabindex', '-1');
            }
        });
        //change tab index on pagination links to remove disabled links from tab order
        jQuery(document).on('click keyup', 'a', function(e) {
            if (e.type == 'click' || (e.type == 'keyup' && e.keyCode == 13)) {
                var dts = jQuery('.dataTables_paginate');
                if (jQuery(dts).hasClass('dataTables_paginate')) {
                    setTimeout(function() {
                        jQuery('.dataTables_paginate a').attr('tabindex', '0');
                        jQuery('.dataTables_paginate a.disabled').attr('tabindex', '-1');
                    }, 100);
                }
            }
        });

    },

    //datepicker 508
    datepicker: function() {
        //add fontawesome font family to datepicker calendars
        jQuery('.date-picker-control .fa.fa-calendar').attr("style", "font-family :'FontAwesome' !important");
    },

    //dialog 508
    dialog: function(el) {
        var dialog = jQuery('.ui-dialog'),
            contents = jQuery('.dialog-contents'),
            titleBar = jQuery('.ui-dialog-titlebar');

        //adding structure for jquery ui dialog
        if (jQuery('div').hasClass('ui-dialog')) {
            dialog.find('.ui-dialog-content').attr('aria-hidden', 'false');
            //wrap dialog inner elements
            if (dialog.find(contents).length === 0) {
                dialog.wrapInner("<div class='dialog-contents' role='document'></div>");
            }
            //add attributes to close button
            titleBar.find('.ui-button').attr({
                    //'tabindex': "0",
                    "aria-label": 'Close'
                }).addClass("fa fa-times-circle icon_circle_remove pull-right")
                .removeClass("ui-dialog-titlebar-close ui-button-icon-only")
                .find('.ui-button-text')
                .addClass("adobeBlank")
                .attr('aria-hidden', 'true')
                .css('position', 'absolute');
            //make title element focusable and set up as H1 
            titleBar.find('.ui-dialog-title').attr({
                'tabindex': '-1',
                'style': 'width: auto',
                'role': 'heading',
                'aria-level': '1'
            })

        }
        if (jQuery("#progressDialog").is('.ui-dialog-content')) {
            if (jQuery('#progressbarText').length === 0) {
                jQuery('.ui-dialog-content').append('<div id="progressbarText" class="sr-only" role="status" aria-live="assertive"></div>');
            }
        };
    },
    dialogOpen: function() {
        var titleBar = jQuery('.ui-dialog-titlebar'),
            title = jQuery('.ui-dialog-title'),
            progressTrigger = jQuery('.progressTriggerFocus');

        //make 'x' close button in header larger
        titleBar.find('.ui-button').attr({
            "style": "font-family: 'FontAwesome' !important;font-size: 44px !important;"
        });
        //change title to H1
        title.replaceWith(function() {
            var attrs = '';
            jQuery(jQuery(this)[0].attributes).each(function(i, v) {
                attrs += ' ' + this.nodeName + '="' + this.value + '"';
            });
            return '<h1 ' + attrs + '>' + jQuery(this).text() + '</h1>';
        });



        if (jQuery("#progressDialog").is('.ui-dialog-content')) {
            //If displayed in a modal pop-up remove close button
            setTimeout(function() {
                jQuery(".ui-dialog-titlebar>button").remove();
            }, 2);
            jQuery(document).on("progressbarcomplete", function(event, ui) {
                setTimeout(function() {
                    jQuery('#liveText-polite').text('Progress bar has closed');
                    setTimeout(function() {
                        progressTrigger.attr('aria-hidden', 'false').focus();
                    }, 2000);
                }, 1);
                jQuery(".ui-dialog").remove();
                jQuery('.ui-widget-overlay').remove();
            });

        }
    },
    dialogFocus: function() {
        var title = jQuery('.ui-dialog-title'),
            dialog = jQuery('.ui-dialog'),
            progressbar = jQuery('[role="progressbar"]');
        //focus on h1 after 100th of a second
        setTimeout(function() {
            if (dialog.hasClass('progressBar')) {
                progressbar.focus();
            } else {
                title.focus();
            }
            /*else if (jQuery('html').is('.lt-ie9, .ie9, .ie10, .ie11')) {
                //move focus to H1 tag in IE browsers for JAWS users
                title.focus();
            }*/
        }, 1);
        jQuery('.ui-resizable-handle, .ui-progressbar-overlay').attr('aria-hidden', 'true');
    },
    expandCollapse: function(options) {

        if (options['text'] === true) {


            //change icon hc mode text to toggle on click
            jQuery('.collapsibleBoxActive').on('click', function() {
                if (jQuery(this).children('a').hasClass('collapsible-heading-collapsed')) {
                    jQuery(this).find('.adobeBlank').text('Collapsed Icon');
                } else {
                    jQuery(this).find('.adobeBlank').text('Expanded Icon');
                }
            });

            //change icon hc mode text to toggle on click
            jQuery('.collapsible-heading').on('click', function() {
                if (jQuery(this).hasClass('collapsible-heading-collapsed')) {
                    jQuery(this).find('.adobeBlank').text('Collapsed Icon');
                } else {
                    jQuery(this).find('.adobeBlank').text('Expanded Icon');
                }
            });

        } else {


            if (jQuery(".toggleIcon").hasClass("glyphicon-expand")) {
                jQuery(".toggleIcon").html("<span class='adobeBlank'>Collapsed icon</span>");
            } else if (jQuery(".toggleIcon").hasClass("glyphicon-collapse-down")) {
                jQuery(".toggleIcon").html("<span class='adobeBlank'>Expanded icon</span>");
            }

            jQuery('.toggleIcon').keydown(function(event) {
                if (event.keyCode === 32) {
                    //alert('spacebar');
                    event.preventDefault();
                    jQuery(this).click();
                }
                return true;
            });

            if (options['expandDefault'] === true) {

                jQuery('.collapsible-heading-toggle-icon').attr('aria-expanded', 'true');
                if (!jQuery('.collapsible-heading-toggle-icon').children().hasClass('expand-icon')) {
                    jQuery('.collapsible-heading-toggle-icon').prepend("<em data-collapse-text='collapse' data-expand-text='expand' title='Expanded' class='expand-icon'></em>");
                }
                this.expandIconButton();
            } else {
                jQuery('.collapsible-heading-toggle-icon').attr('aria-expanded', 'false');
                if (!jQuery('.collapsible-heading-toggle-icon').children().hasClass('expand-icon')) {
                    jQuery('.collapsible-heading-toggle-icon').prepend("<em data-collapse-text='collapse' data-expand-text='expand' title='Collapsed' class='collapse-icon'></em>");
                }
                this.expandIconButton();
            }

            //change icon hc mode text to toggle on click
            jQuery('.collapsible-heading-toggle-icon').on('click', function() {
                var icon = jQuery(this).children()[0];

                if (icon !== typeof undefined && icon !== '') {
                    if (jQuery(icon).hasClass('collapse-icon')) {
                        jQuery(icon).parent().attr('aria-expanded', 'true');
                        jQuery(icon).attr('title', 'Expanded').attr('class', 'expand-icon').empty();
                    } else {
                        jQuery(icon).parent().attr('aria-expanded', 'false');
                        jQuery(icon).attr('title', 'Collapsed').attr('class', 'collapse-icon').empty();
                    }
                }

            });

            jQuery('.collapsible-heading-toggle-icon').keydown(function(event) {
                if (event.keyCode === 32) {
                    //alert('spacebar');
                    event.preventDefault();
                    jQuery(this).click();
                }
                return true;
            });

        }
        //removed button role from collapsible image links on expand/collapse
        jQuery(".collapsible-heading").removeAttr("role");
    },

    //create buttons from anchor tags to keep semantics and prevent 'visited link' announcements with screen readers
    expandIconButton: function() {
        //get anchor tag inside of heading tag with 'collapsibleIcon' class
        var anchors = jQuery('.collapsibleIcon > a');
        //if anchor tag exists change it to a button
        if (anchors.length !== 0) {
            var anchorClass = anchors.attr('class'),
                anchorExpanded = anchors.attr('aria-expanded');
            anchors.find('em').attr("style", "font-family :'FontAwesome' !important");
            anchors.wrapInner('<button/>');
            anchors.children('button').attr({
                'class': anchorClass,
                'aria-expanded': anchorExpanded
            }).addClass('btn-link').attr('tabindex', '0');
            anchors.contents().unwrap();
        }
    },

    externalWindow: function() {
        //check if exit text is set otherwise append it.
        jQuery('a[target="_blank"]:not(.sr-set)').append(exitText).addClass('sr-set');
    },

    externalWindowImage: function() {
        //check if exit text is set otherwise append it.
        jQuery('a[target="_blank"]:not(.sr-set)').append(exitTextImage).addClass('sr-set');
    },


    externalPolicy: function() {
        //check if exit text is set otherwise append it.
        if (!jQuery('a.extlink').next().is('a')) {
            jQuery('a.extlink').after(policyText);
        }
    },

    //font based icons 508
    fontIcons: function() {
        jQuery('.fa').attr("style", "font-family :'FontAwesome' !important");
        jQuery('.glyphicon').delay(500).attr("style", "font-family :'Glyphicons Halflings' !important");
        jQuery('button[data-validationtrigger]').on('click', function() {
            jQuery('.fa').attr("style", "font-family :'FontAwesome' !important");
            jQuery('.glyphicon').delay(500).attr("style", "font-family :'Glyphicons Halflings' !important");
        });
    },

    //Set custom focus
    focusMethod: function(options) {
        //Options <delay> <boolean> required, <id> <string> of focuasable element, or <class> <string> of focusable element, or <element> <string> of element name.
        if (options.length !== 0) {
            if (options.delay) {
                //Delay often used to set focus in legacy IE with strict render order
                if (options.id !== undefined) {
                    setTimeout(function() {
                        jQuery('#' + options.id).focus();
                    }, 100);
                } else if (options['class'] !== undefined) {
                    setTimeout(function() {
                        jQuery('.' + options['class']).focus();
                    }, 100);
                } else if (options['element'] !== undefined) {
                    setTimeout(function() {
                        jQuery(options['element']).focus();
                    }, 100);
                }
            } else {
                if (options.id !== undefined) {
                    jQuery('#' + options.id).focus();
                } else if (options['class'] !== undefined) {
                    jQuery('.' + options['class']).focus();
                } else if (options['element'] !== undefined) {
                    jQuery(options['element']).focus();
                }
            }

        }
    },

    //Set custom focus to heading
    focustoHeading: function() {

        var skipto = jQuery("h1:first");

        jQuery(document).scrollTop(skipto.offset().top);
        skipto.attr("tabIndex", "-1");
        skipto.focus();
        skipto.focusout(function() {
            jQuery(this).removeAttr("tabindex");
        });
    },


    // Method to get focused element
    getFocusedElement: function() {
        var elem = document.activeElement;
        return jQuery(elem && (elem.type || elem.href) ? elem : []);
    },

    // Method to get parameters from the querystring
    getQueryStringVal: function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results === null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    //Method to pull entire querystring
    getQueryString: function(name, uri) {
        if (typeof(uri) != 'string') uri = window.location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\#?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(uri);
        try {
            return results[1];
        } catch (e) {
            return "undefined";
        }
    },

    //Adding aria-level and role for all headings
    headings: function() {
        var headings = "h1, h2, h3, h4, h5, h6";

        jQuery(headings).delay(1000).each(function() {
            if (!jQuery(this).attr('role')) {
                var headingLevel = jQuery(this)[0].nodeName.substring(1);
                jQuery(this).attr({
                    'role': 'heading',
                    'aria-level': headingLevel
                });
            }
        });
    },
    ieDetect: function() {
        //detect ie10/11 and add corresponding class on the HTML element
        var html = jQuery('html'),
            ie10 = (navigator.userAgent.match(/MSIE 10/i)),
            ie11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
        if (ie10 == "MSIE 10") html.addClass('ie10');
        if (ie11 == true) html.addClass('ie11');
    },
    //allow links that appear as buttons to fucntion with the spacebar
    keyPressLinks: function() {
        jQuery('a[role=button]').off("keypress").on("keypress", function(e) {
            if (e.keyCode === 32) {
                jQuery(this).trigger("click");
                e.preventDefault();
            }
        });
    },

    menu: function(el) {
        //Adding aria-selected for each selected li in menu
        el.on("menufocus", function(event, ui) {
            jQuery(".ui-state-focus").attr('aria-selected', 'true');
        });

        el.on("menublur", function(event, ui) {
            jQuery('.ui-menu a').each(function(index, element) {
                jQuery(this).removeAttr('aria-selected');
            });
        });
    },

    progressbar: function() {
        var progressTrigger = jQuery('.progressTriggerFocus'),
            titleBar = jQuery('.ui-dialog-titlebar');

        jQuery(document).on("progressbarcreate", ".ui-progressbar", function(event, ui) {
            //titleBar.focus();
            jQuery(".ui-progressbar").removeClass("ui-corner-all");
            progressTrigger.attr('aria-hidden', 'true');
            //remove corners class from title bar 
            jQuery(".ui-progressbar-value").removeClass("ui-progressbar-value ui-widget-header ui-corner-left").addClass("ui-progressbar-overlay");

            //Change dialog container to use role='dialog' to read correctly with screen readers
            jQuery('.dialog-contents').attr('role', 'dialog');
        });
    },

    required: function() {
        // Add aria-required="true" and aria-described by to form feilds only
        if (jQuery('span.requiredField').length > 0) {
            var x = 0;
            jQuery('span.requiredField').parent().each(function(index, elem) {
                //add ID to formatting span
                jQuery(this).siblings(".text-tip").attr('id', 'formatting' + x);

                if (jQuery(this).next().prop('type') === 'text' || jQuery(this).next().prop('type') === 'select-one') {
                    jQuery(this).next().attr('aria-required', 'true');
                    jQuery(this).next().attr('aria-describedby', 'formatting' + x);
                } else if (jQuery(this).next().next().prop('type') === 'text' || jQuery(this).next().next().prop('type') === 'select-one') {
                    jQuery(this).next().next().attr('aria-required', 'true');
                    jQuery(this).next().attr('aria-describedby', 'formatting' + x);
                }
                x++;
            });
        }

    },



    //tabs 508
    tabs: function(el) {
        //all changes in the extend for ui.tabs
    },
    //get title of page on view change and add to live region
    titlePageChange: function() {
        var pageTitle = jQuery(document).find("title").text();
        jQuery('#liveText').text(pageTitle);

    },
    //tooltip 508
    tooltips: function() {
        jQuery(".selector").on("tooltipopen", function(event, ui) {});
    }

    //end of A11y namespace function
};



/*******************************************
    Extension Methods for jQuery widgets
*******************************************/

//extend the tabs function ++33
jQuery.widget("ui.tabs", jQuery.ui.tabs, {
    _create: function(event, ui) {
        if (debugON) console.log('Custom Tabs Widget');
        //applying the live regiions for page load because the A11y.Core function is not called at time of execution of the tabs widget
        jQuery('body').prepend('<div id="liveText" class="sr-only" aria-live="assertive"></div>');
        jQuery('body').prepend('<div id="liveText-polite" class="sr-only" aria-live="polite"></div>');
        return this._super();
    },
    _refresh: function() {

        //remove specific classes on tabs widget on page load
        var tabContainer = this.element;
        tabContainer.removeClass('ui-widget ui-widget-content ui-corner-all');
        //get the text of the tab that is active on page load 
        if (this.active.length) {
            var newTabText = jQuery.trim(this.active[0].textContent);
            //alert sr via polite live region of tab change
            jQuery('#liveText-polite').text(newTabText + ' tab is selected');
            setTimeout(function() {
                jQuery('#liveText-polite').text('')
            }, 1000)
        } else {}
        return this._super();
    },
    // handles show/hide for selecting tabs
    _toggle: function(event, eventData) {
        //get text of activated tab 
        var newTabText = jQuery.trim(eventData.newTab[0].textContent);
        //alert sr via polite live region of tab change
        jQuery('#liveText-polite').text(newTabText + ' tab is selected');
        setTimeout(function() {
            jQuery('#liveText-polite').text('')
        }, 1000)
        return this._super(event, eventData);
    }
});