FROM portainer/portainer

EXPOSE 9000

CMD ["-H","unix:///var/run/docker.sock","--restart","always","--name","portainer","-p","9000:9000"]