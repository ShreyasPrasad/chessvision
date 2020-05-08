#utils for querying POSTGRES database
def Session():
    from aldjemy.core import get_engine
    from sqlalchemy.orm import sessionmaker
    engine = get_engine()
    _Session = sessionmaker(bind=engine)
    return _Session()