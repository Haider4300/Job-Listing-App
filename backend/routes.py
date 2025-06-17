from sqlalchemy import or_
from flask import request, jsonify
from models import db, Job  # Use Job from models.py

def init_routes(app):
    @app.route('/jobs', methods=['GET'])
    def get_jobs():
        try:
            job_type = request.args.get('job_type')
            location = request.args.get('location')
            tag = request.args.get('tag')
            search = request.args.get('title')

            query = Job.query

            if job_type:
                query = query.filter_by(job_type=job_type)
            if location:
                query = query.filter(Job.location.ilike(f"%{location}%"))
            if tag:
                query = query.filter(Job.tags.ilike(f"%{tag}%"))
            if search:
                query = query.filter(
                    or_(
                        Job.title.ilike(f"%{search}%"),
                        Job.company.ilike(f"%{search}%")
                    )
                )

            sort = request.args.get('sort')
            if sort == 'posting_date_desc':
                query = query.order_by(Job.posting_date.desc())
            elif sort == 'posting_date_asc':
                query = query.order_by(Job.posting_date.asc())

            jobs = query.all()
            return jsonify([job.to_dict() for job in jobs])
        except Exception as e:
            app.logger.error(f"Error fetching jobs: {str(e)}")
            return {'error': 'Failed to fetch jobs'}, 500

    @app.route('/jobs', methods=['POST'])
    def create_job():
        try:
            data = request.get_json()
            required_fields = ['title', 'company', 'location']
            if not all(field in data for field in required_fields):
                return {'error': 'Missing required fields'}, 400

            tags = data.get('tags', [])
            if isinstance(tags, str):
                tags = [tag.strip() for tag in tags.split(',') if tag.strip()]

            job = Job(
                title=data['title'],
                company=data['company'],
                location=data['location'],
                job_type=data.get('job_type', 'Full-time'),
                tags=','.join(tags)
            )
            db.session.add(job)
            db.session.commit()
            return job.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error creating job: {str(e)}")
            return {'error': 'Failed to create job'}, 500

    @app.route('/jobs/<int:id>', methods=['PUT'])
    def update_job(id):
        try:
            job = Job.query.get_or_404(id)
            data = request.get_json()

            if 'title' in data:
                job.title = data['title']
            if 'company' in data:
                job.company = data['company']
            if 'location' in data:
                job.location = data['location']
            if 'job_type' in data:
                job.job_type = data['job_type']
            if 'tags' in data:
                tags = data['tags']
                if isinstance(tags, str):
                    tags = [tag.strip() for tag in tags.split(',') if tag.strip()]
                job.tags = ','.join(tags)

            db.session.commit()
            return job.to_dict()
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error updating job {id}: {str(e)}")
            return {'error': f'Failed to update job: {str(e)}'}, 400

    @app.route('/jobs/<int:id>', methods=['DELETE'])
    def delete_job(id):
        try:
            job = Job.query.get_or_404(id)
            db.session.delete(job)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error deleting job {id}: {str(e)}")
            return {'error': 'Failed to delete job'}, 500


