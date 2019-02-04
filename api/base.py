import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

if (not len(firebase_admin._apps)):
    cred = credentials.Certificate('xxxxx.json')
    firebase_admin.initialize_app(cred)
db = firestore.client()

class Model:
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key in self.__dir__() and not callable(getattr(self, key)):
                self.__dict__[key] = value

    def save(self):
        ref = db.collection(self.__class__.__name__).document()
        ref.set(self.__dict__)
        return ref.get()

    @classmethod
    def get(self, conditions=[]):
        query = db.collection(self.__name__)
        for condition in conditions:
            query = query.where(condition[0], condition[1], condition[2])

        return list(query.get())[0] if len(list(query.get())) == 1 else list(query.get())

    @classmethod
    def doc(self, document_id):
        query = db.collection(self.__name__).document(document_id)
        return query.get() if query.get().to_dict() != None else None