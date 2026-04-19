import json

def handler(request):
    try:
        body = request.get_json()
        url = body.get("url")

        if not url:
            return {
                "statusCode": 400,
                "body": json.dumps({"success": False, "message": "No URL"})
            }

        # TEMP TEST RESPONSE (IMPORTANT)
        return {
            "statusCode": 200,
            "body": json.dumps({
                "success": True,
                "video": "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"success": False, "message": str(e)})
        }