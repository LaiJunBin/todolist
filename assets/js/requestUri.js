var uri = {};
var baseUri = 'assets/php/';

function addUri(file, type) {
    uri[file] = baseUri + file + '.' + type;
}

addUri('date', 'php');
addUri('event', 'php');
addUri('query', 'php');
addUri('addTodo', 'php');
addUri('modifyTodo', 'php');
addUri('deleteTodo', 'php');
addUri('successTodo', 'php');