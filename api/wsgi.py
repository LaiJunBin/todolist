from flask import Flask, Blueprint
from gevent.pywsgi import WSGIServer
import importlib, settings

app = Flask(__name__)

for _app in settings.INSTALLED_APPS:
    module = importlib.import_module(_app)
    bp = module.route.initial(Blueprint(_app, __name__, url_prefix=module.url_prefix))
    app.register_blueprint(bp)

print(app.url_map)

# Debug/Development
app.run(debug=True, host="0.0.0.0", port="5000")

# Production
# http_server = WSGIServer(('', 5000), app)
# http_server.serve_forever()