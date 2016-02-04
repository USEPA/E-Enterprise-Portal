(function($) {
    function truncate(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        var truncated = text.substr(0, maxLength);
        var spaceIndex = truncated.lastIndexOf(' ');
        if (spaceIndex === -1) {
            return truncated + '...';
        }
        return truncated.substring(0, spaceIndex) + '...';
    }

}(jQuery));