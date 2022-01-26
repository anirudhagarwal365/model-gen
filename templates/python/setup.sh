echo "Starting Script"

echo "installing virtuallenv"
pip install virtualenv virtualenvwrapper

echo "creating virtual env for python version 2.7"
virtualenv venv --python=python2.7

echo "installing python dependencies"
pip install -r requirements.txt
