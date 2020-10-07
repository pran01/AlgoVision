#!/bin/bash
# Script to run AlgoVision in a docker container

docker_run_AlgoVision() {
	# Check if docker is installed
	if ! which docker &>/dev/null
	then
		echo "Error: docker not installed"
		echo "Install instructions: https://docs.docker.com/get-docker/"
		return 1
	# Check if algovision image has been built
	elif ! docker images | grep -q 'algovision'
	then
		docker build -t algovision .
	fi

	# Run algovision image forwarding internal port 5000 to local port 5000
	docker run -p 5000:5000 algovision python /app/run.py
	return $?
}

# Call main function
docker_run_AlgoVision
