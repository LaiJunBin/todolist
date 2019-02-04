from . import service


def initial(app):
    app.add_url_rule('/', 'list', service.list)
    app.add_url_rule('/', 'create', service.create, methods=['POST'])
    app.add_url_rule('/<id>', 'search', service.search)
    app.add_url_rule('/<id>', 'update', service.update, methods=['PATCH', 'PUT'])
    app.add_url_rule('/<id>', 'delete', service.delete, methods=['DELETE'])
    return app

