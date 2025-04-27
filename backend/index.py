from app import app

# Vercel needs this handler
def handler(request, context):
    return app(request, context)

# For local development
if __name__ == "__main__":
    app.run(debug=True)