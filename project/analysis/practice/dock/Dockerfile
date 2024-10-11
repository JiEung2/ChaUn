FROM thenoface/s11p21c106_python39_base:latest
ENV FASTAPI_PORT=8000
WORKDIR /fastapi
COPY . .
# RUN pip install --no-cache-dir -r requirements_deploy.txt
RUN chmod a+x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
