"""Create tasks table with id, task, created_at

Revision ID: 888d83db9481
Revises: 
Create Date: 2024-07-28 11:17:25.673118

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '888d83db9481'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """
    Applies the migration by creating the 'tasks' table with the following columns:
    - id (Integer, primary key): Unique identifier for the task.
    - task (String): Description or content of the task.
    - created_at (DateTime): Timestamp of when the task was created, defaults to current UTC time.

    This function sets up the database schema for the tasks table.
    """
    op.create_table(
        'tasks',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('task', sa.String, index=True),
        sa.Column('created_at', sa.DateTime, default=sa.func.utcnow())
    )


def downgrade() -> None:
    """
    Reverts the migration by dropping the 'tasks' table.

    This function removes the database schema for the tasks table, effectively undoing
    the changes made in the upgrade() function.
    """
    op.drop_table('tasks')
