#!/bin/bash
# Script to run AlgoVision in a docker container

docker_run_AlgoVision() {
	usage() { echo "Usage: $0 -b" 1>&2; exit 1; }

	# Parse CLI args	
	REBUILD=0
	while getopts ":b" o; do
	    case "${o}" in
	        b)
	            REBUILD=1
	            ;;
	        *)
	            usage
	            ;;
	    esac
	done
	shift $((OPTIND-1))

	# Check if docker is installed
	if ! which docker &>/dev/null
	then
		echo "Error: docker not installed"
		echo "Install instructions: https://docs.docker.com/get-docker/"
		return 1
	# Check if algovision image needs to been built
        elif ( ! docker images | grep -q 'algovision' ) || [ $REBUILD -eq 1 ]
	then
		docker build -t algovision .
	fi

	# Run algovision image forwarding internal docker port 5000 to local port 5000
	docker run -p 5000:5000 algovision python /app/run.py
	return $?
}

# Call main function
docker_run_AlgoVision $@
