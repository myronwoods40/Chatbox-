var anyKeyResponseSet = [];
var allKeyResponseSet = [];
var nomatchResponseSet = [];

// store the ANY messages for the key (the first arg)
function keyResponseAny()
{
    if (arguments.length > 1)
    {
        var krObj = [];
        krObj.push(arguments[0]);
        for (var i = 1; i < arguments.length; ++i)
        {
            krObj.push(arguments[i].toLowerCase());
        }
        anyKeyResponseSet.push(krObj);
    }
}

// store the ALL messages for the key (the first arg)
function keyResponseAll()
{
    if (arguments.length > 1)
    {
        var krObj = [];
        krObj.push(arguments[0]);
        for (var i = 1; i < arguments.length; ++i)
        {
            krObj.push(arguments[i].toLowerCase());
        }
        allKeyResponseSet.push(krObj);
    }
}

// store the NOMATCH messages
function noMatchMessage()
{
    for (var i = 0; i < arguments.length; ++i)
    {
        nomatchResponseSet.push(arguments[i].toLowerCase());
    }
}

// Get an answer by checking ANY, ALL and NOMATCH values
function getAnswer(sentence)
{
    var words = sentence.toLowerCase().split(" ");

    // Checking the ANY key responses
    if (anyKeyResponseSet.length > 0)
    {
        for (var i = 0; i < anyKeyResponseSet.length; ++i)
        {
            var krObj = anyKeyResponseSet[i];
            for (var j = 1; j < krObj.length; ++j)
            {
                for (var k = 0; k < words.length; ++k)
                {
                    if (krObj[j] == words[k])
                    {
                        return krObj[0];
                    }
                }
            }
        }
    }

    // If an ANY keys was found it returned.
    // If it did not return, check the All key responses
    if (allKeyResponseSet.length > 0)
    {
        for (var i = 0; i < allKeyResponseSet.length; ++i)
        {
            var krObj = allKeyResponseSet[i];
            var failed = false;
            for (var j = 1; j < krObj.length; ++j)
            {
                var found = false;
                for (var k = 0; k < words.length; ++k)
                {
                    if (krObj[j] == words[k])
                    {
                        found = true;
                        break;
                    }
                }
                if (!found)
                {
                    failed = true;
                    break;
                }
            }
            if (!failed)
            {
                return krObj[0];
            }
        }
    }

    // If an ANY keys was found it returned.
    // If not, us a NOMATCH answer if available
    if (nomatchResponseSet.length > 0)
    {
        var n = Math.floor(Math.random() * 
                             nomatchResponseSet.length);
        return nomatchResponseSet[n];
    }

    // If no NOMATCH answers are available
    return "I'm not sure what you mean, please rephrase that.";
}