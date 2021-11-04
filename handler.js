
/**
 * **Lambda event handler**
 * Gets a list of things
 * @param {object} event
 * @param {object} context
 * @param {Function} callback
 * @returns {object} List of things
 */
function dummy( event, context, callback ) {
    console.log( 'get called with', event );
}

module.exports.dummy = dummy;