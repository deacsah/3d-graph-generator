$('input#top').ColorPicker({
    color: '#0000ff',
    onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function(hsb, hex, rgb) {
        $('input#top').val('#' + hex);
    }
});
$('input#front').ColorPicker({
    color: '#0000ff',
    onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function(hsb, hex, rgb) {
        $('input#front').val('#' + hex);
    }
});
$('input#side').ColorPicker({
    color: '#0000ff',
    onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function(hsb, hex, rgb) {
        $('input#side').val('#' + hex);
    }
});
$('input#xlabel').ColorPicker({
    color: '#0000ff',
    onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function(hsb, hex, rgb) {
        $('input#xlabel').val('#' + hex);
    }
});
$('input#ylabel').ColorPicker({
    color: '#0000ff',
    onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function(hsb, hex, rgb) {
        $('input#ylabel').val('#' + hex);
    }
});
$('input#zlabel').ColorPicker({
    color: '#0000ff',
    onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
    },
    onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
    },
    onChange: function(hsb, hex, rgb) {
        $('input#zlabel').val('#' + hex);
    }
});