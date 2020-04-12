using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic goes here
                var activity=await _context.Activities.FindAsync(request.Id);
                if(activity==null)
                throw new Exception("Could not find activity");

                activity.Title=request.Title ?? activity.Title;// means, if "request.Title" is null, then whatever is written on right side of ?? is going to be executed.
                 activity.Description=request.Description ?? activity.Description;// means, if "request.Title" is null, then whatever is written on right side of ?? is going to be executed.
                  activity.Category=request.Category ?? activity.Category;// means, if "request.Title" is null, then whatever is written on right side of ?? is going to be executed.
                   activity.Date=request.Date ?? activity.Date;// means, if "request.Title" is null, then whatever is written on right side of ?? is going to be executed.
                    activity.City=request.City ?? activity.City;// means, if "request.Title" is null, then whatever is written on right side of ?? is going to be executed.
                     activity.Venue=request.Venue ?? activity.Venue;// means, if "request.Title" is null, then whatever is written on right side of ?? is going to be executed.


                var success = await _context.SaveChangesAsync() > 0;//means if the value of "_context.SaveChangesAsync()" is greater than 0, only the value will be assigned to success
                if (success) return Unit.Value;
                throw new Exception("Problem Saving Changes");
            }
        }
    }
}