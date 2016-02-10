/**
 * --------------------------------------------------------------------
 * jQuery collapsible plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */
$.fn.collapsible = function(options) {
    return $(this).each(function(extendedOptions) {

        //define content to expand collapse
        var collapsibleHeading = $(this);
        var collapsibleContent = collapsibleHeading.next();
        var defaultExpandCollapseSettings = {
            text: false,
            icon: true,
            closeAll: false
        };

        var collapseString,
            expandString,
            hasExpandedString,
            hasCollapsedString,
            lang;

        //lang = $("html").attr('lang').split('-')[0]; // added .split('-')[0] as there was a number of variations that use a language split, as in es-MX

        lang = collapsibleHeading.closest("[lang]").attr('lang');

        if (lang.indexOf("en") >= 0) {
            collapseString = "Close";
            hasCollapsedString = "has collapsed";
            expandString = "Open";
            hasExpandedString = "has expanded";
        } else if (lang.indexOf("es") >= 0) {
            collapseString = "Reducir";
            hasCollapsedString = "se ha derrumbado";
            expandString = "Ampliar";
            hasExpandedString = "se ha expandido";
        }

        var originalHeadingText = collapsibleHeading.text();

        var extendedOptions = $.extend({}, defaultExpandCollapseSettings, options);

        if (extendedOptions["text"]) {
            var collapsibleLink = $("<a role='button' href='#' class='collapsible-heading' onclick='return false;'>" +
                "<span class='toggleIndicator'>" + collapseString + " <span aria-hidden='true'></span></span>" +
                "<span class='sr-only'> " + collapsibleHeading.text() + " section</span></a>");
            collapsibleHeading.append(collapsibleLink);
            collapsibleContent.addClass('collapsible-content');
        }

        //modify markup & attributes
        else if (extendedOptions["icon"]) {
            var collapsibleLink = $('<a class="collapsible-heading-toggle-icon"></a>');
            collapsibleHeading.addClass('collapsible-heading-icon')
                .prepend('<span class="collapsible-heading-status-icon"></span>')
                .wrapInner(collapsibleLink);

            collapsibleContent.addClass('collapsible-content-icon');
        } else if (extendedOptions["fontIcon"]) {
            var collapsibleLink = $("<a role='button' href='#' class='collapsible-heading fontIconIndicator' onclick='return false;'>" +
                "<span class='toggleIcon glyphicon glyphicon-expand' style=\"font-family :'Glyphicons Halflings' !important\"></span>" +
                //"<span class='toggleIcon Glyphicons' style='font-family: Glyphicons;'> </span>" + 
                "<span class='toggleIndicator sr-only'>" + collapseString + "</span>" +
                "<span class='sr-only'> " + collapsibleHeading.text() + " section</span></a>");
            collapsibleHeading.append(collapsibleLink);
            collapsibleContent.addClass('collapsible-content');

        }

        // Make links with the button role respond to the Space key (expected behavior for buttons)
        $('a[role=button]', collapsibleHeading).keydown(function(event) {
            if (event.keyCode === 32) {
                event.preventDefault();
                $(this).click();
            }
            return true;
        });

        var openExpanded = collapsibleHeading.hasClass("openExpanded");

        //events

        collapsibleLink
            .bind('collapse', function() {
                if (extendedOptions["icon"]) {
                    collapsibleHeading
                        .addClass('collapsible-heading-collapsed-icon')
                        .find('.collapsible-heading-status-icon').text('Collapsed ');
                    collapsibleHeading
                        .find('.toggleIndicator').html(expandString + " <span aria-hidden='true'></span>");
                    $(this).addClass('collapsible-heading-toggle-icon');
                } else if (extendedOptions["fontIcon"]) {
                    $(this)
                        .addClass('collapsible-heading-collapsed')
                        .find(".toggleIndicator").html(expandString)
                        .end()
                        //.find(".toggleIcon").html("");
                        .find(".toggleIcon").removeClass("glyphicon-collapse-down").addClass("glyphicon-expand");
                } else {
                    $(this)
                        .addClass('collapsible-heading-collapsed')
                        .find(".toggleIndicator").html(expandString + " <span aria-hidden='true'>+</span>");
                }
                collapsibleContent.slideUp(function() {
                    if (extendedOptions["icon"]) {
                        $(this).addClass('collapsible-content-collapsed-icon').removeAttr('style').attr('aria-hidden', true);
                    } else {
                        $(this).addClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden', true);
                    }
                });
                $(this).attr('aria-expanded', 'false');

                setTimeout(function() {
                    $('#liveText').text(originalHeadingText + " " + hasCollapsedString);
                }, 100);
                setTimeout(function() {
                    $('#liveText').text('');
                }, 1000);
            })
            .bind('expand', function() {

                if (extendedOptions["icon"]) {
                    collapsibleHeading
                        .removeClass('collapsible-heading-collapsed-icon')
                        .find('.collapsible-heading-status-icon').text('Expanded ');
                    collapsibleHeading
                        .find('.toggleIndicator').html("Close <span aria-hidden='true'></span>");
                    $(this).removeClass('collapsible-heading-toggle-icon');
                } else if (extendedOptions["fontIcon"]) {
                    $(this)
                        .removeClass('collapsible-heading-collapsed')
                        .find(".toggleIndicator").html(collapseString)
                        .end()
                        //.find(".toggleIcon").html("");
                        .find(".toggleIcon").removeClass("glyphicon-expand").addClass("glyphicon-collapse-down");
                } else {
                    $(this)
                        .removeClass('collapsible-heading-collapsed')
                        .find(".toggleIndicator").html(collapseString + " <span aria-hidden='true'>-</span>");
                }

                collapsibleContent.slideDown(function() {
                    if (extendedOptions["icon"]) {
                        $(this).removeClass('collapsible-content-collapsed-icon').removeAttr('style').attr('aria-hidden', false);
                    } else {
                        $(this).removeClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden', false);
                    }
                });
                $(this).attr('aria-expanded', 'true');
                setTimeout(function() {
                    $('#liveText').text(originalHeadingText + " " + hasExpandedString);
                }, 100);
                setTimeout(function() {
                    $('#liveText').text('');
                }, 1000);
            })
            .click(function() {
                if ($(this).is('.collapsible-heading-collapsed')) {

                    if (extendedOptions["closeAll"]) {
                        $(this.nodeName.toLowerCase() + '.collapsible-heading').trigger('collapse');
                    }
                    $(this).trigger('expand');
                } else if ($(this).is('.collapsible-heading-toggle-icon')) {
                    $(this).trigger('expand');
                } else {
                    $(this).trigger('collapse');
                }
                return false;
            });

        collapsibleHeading.click(function(event) {
            collapsibleLink.click();
        });

        if (!openExpanded) {
            collapsibleLink.trigger('collapse'); //block is collapsed by default, unless the heading has the openExpanded class.
        } else {
            collapsibleLink.trigger('expand');
        }



    });
};