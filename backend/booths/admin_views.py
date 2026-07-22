from django.shortcuts import get_object_or_404
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .permissions import IsAdminUser
from .models import Booth
from .admin_serializers import AdminBoothSerializer

from .models import BoothContent
from .content_serializers import BoothContentSerializer

class AdminBoothListCreateAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        booths = Booth.objects.all().order_by("-id")

        serializer = AdminBoothSerializer(
            booths,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = AdminBoothSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class AdminBoothDetailAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get_object(self, booth_id):

        return get_object_or_404(
            Booth,
            id=booth_id
        )

    def get(self, request, booth_id):

        booth = self.get_object(booth_id)

        serializer = AdminBoothSerializer(
            booth
        )

        return Response(serializer.data)

    def put(self, request, booth_id):

        booth = self.get_object(booth_id)

        serializer = AdminBoothSerializer(
            booth,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, booth_id):

        booth = self.get_object(booth_id)

        booth.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
    
class AdminBoothContentAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request, booth_id):

        contents = BoothContent.objects.filter(
            booth_id=booth_id
        ).order_by("-id")

        serializer = BoothContentSerializer(
            contents,
            many=True
        )

        return Response(serializer.data)

    def post(self, request, booth_id):

        booth = get_object_or_404(
            Booth,
            id=booth_id
        )

        source_type = request.data.get(
            "source_type"
        )

        uploaded_file = request.FILES.get(
            "file"
        )

        external_url = request.data.get(
            "external_url"
        )

        if source_type == "UPLOAD":

            if not uploaded_file:

                return Response(

                    {

                        "error":

                        "Please upload a file."

                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

        elif source_type == "LINK":

            if not external_url:

                return Response(

                    {

                        "error":

                        "Please enter a valid URL."

                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

        serializer = BoothContentSerializer(

            data=request.data

        )

        if serializer.is_valid():

            serializer.save(

                booth=booth

            )

            return Response(

                serializer.data,

                status=status.HTTP_201_CREATED

            )

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )
    
class AdminBoothContentDetailAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get_object(self, content_id):

        return get_object_or_404(
            BoothContent,
            id=content_id
        )

    def put(self, request, content_id):

        content = self.get_object(content_id)

        data = request.data.copy()

        source_type = data.get("source_type")

        uploaded_file = request.FILES.get("file")

        external_url = data.get("external_url")

        # ==========================
        # Validation
        # ==========================

        if source_type == "UPLOAD":

            # Jika tidak upload file baru,
            # gunakan file lama.

            if not uploaded_file:

                data.pop("file", None)

            # Upload tidak membutuhkan URL
            data["external_url"] = ""

        elif source_type == "LINK":

            if not external_url:

                return Response(

                    {
                        "error": "Please enter a valid URL."
                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

            # Link tidak membutuhkan file
            data.pop("file", None)

        serializer = BoothContentSerializer(

            content,

            data=data,

            partial=True

        )

        if serializer.is_valid():

            if uploaded_file:

                if content.file:

                    if os.path.isfile(content.file.path):

                        os.remove(content.file.path)

            if source_type == "LINK":

                if content.file:

                    if os.path.isfile(content.file.path):

                        os.remove(content.file.path)

            serializer.save()

            return Response(serializer.data)

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )

    def delete(self, request, content_id):

        content = self.get_object(content_id)

        if content.file:

            if os.path.isfile(content.file.path):

                os.remove(content.file.path)

        content.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )   