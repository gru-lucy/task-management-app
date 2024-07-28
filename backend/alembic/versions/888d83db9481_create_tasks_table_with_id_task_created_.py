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
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'tasks',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('task', sa.String, index=True),
        sa.Column('created_at', sa.DateTime, default=sa.func.utcnow())
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    # ### end Alembic commands ###
