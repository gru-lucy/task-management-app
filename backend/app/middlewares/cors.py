from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    """
    Adds CORS (Cross-Origin Resource Sharing) middleware to the FastAPI application.

    Parameters:
    - app: The FastAPI application instance to which the middleware will be added.

    CORS Settings:
    - allow_origins (list of str): Specifies which origins are allowed to access the API. 
      Setting it to ["*"] allows all origins.
    - allow_credentials (bool): Indicates whether credentials (e.g., cookies, authorization headers) 
      are allowed to be included in cross-origin requests.
    - allow_methods (list of str): Specifies which HTTP methods are allowed in cross-origin requests.
      Setting it to ["*"] allows all methods (e.g., GET, POST, PUT, DELETE).
    - allow_headers (list of str): Specifies which headers can be used in cross-origin requests.
      Setting it to ["*"] allows all headers.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
