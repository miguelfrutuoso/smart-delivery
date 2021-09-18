"""Vehicles Routing Problem (VRP) with Time Windows."""

from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import requests


class Location:
    def __init__(self, longitude, latitude, timing):
        self.longitude = longitude
        self.latitude = latitude
        self.timing = timing


class Timing:
    def __init__(self, start, end):
        self.start = start
        self.end = end

# def create_data_model():
#     """Stores the data for the problem."""
#     data = {}
#     data['time_matrix'] = [
#         [0, 6, 9, 8, 7, 3, 6, 2, 3, 2, 6, 6, 4, 4, 5, 9, 7],
#         [6, 0, 8, 3, 2, 6, 8, 4, 8, 8, 13, 7, 5, 8, 12, 10, 14],
#         [9, 8, 0, 11, 10, 6, 3, 9, 5, 8, 4, 15, 14, 13, 9, 18, 9],
#         [8, 3, 11, 0, 1, 7, 10, 6, 10, 10, 14, 6, 7, 9, 14, 6, 16],
#         [7, 2, 10, 1, 0, 6, 9, 4, 8, 9, 13, 4, 6, 8, 12, 8, 14],
#         [3, 6, 6, 7, 6, 0, 2, 3, 2, 2, 7, 9, 7, 7, 6, 12, 8],
#         [6, 8, 3, 10, 9, 2, 0, 6, 2, 5, 4, 12, 10, 10, 6, 15, 5],
#         [2, 4, 9, 6, 4, 3, 6, 0, 4, 4, 8, 5, 4, 3, 7, 8, 10],
#         [3, 8, 5, 10, 8, 2, 2, 4, 0, 3, 4, 9, 8, 7, 3, 13, 6],
#         [2, 8, 8, 10, 9, 2, 5, 4, 3, 0, 4, 6, 5, 4, 3, 9, 5],
#         [6, 13, 4, 14, 13, 7, 4, 8, 4, 4, 0, 10, 9, 8, 4, 13, 4],
#         [6, 7, 15, 6, 4, 9, 12, 5, 9, 6, 10, 0, 1, 3, 7, 3, 10],
#         [4, 5, 14, 7, 6, 7, 10, 4, 8, 5, 9, 1, 0, 2, 6, 4, 8],
#         [4, 8, 13, 9, 8, 7, 10, 3, 7, 4, 8, 3, 2, 0, 4, 5, 6],
#         [5, 12, 9, 14, 12, 6, 6, 7, 3, 3, 4, 7, 6, 4, 0, 9, 2],
#         [9, 10, 18, 6, 8, 12, 15, 8, 13, 9, 13, 3, 4, 5, 9, 0, 9],
#         [7, 14, 9, 16, 14, 8, 5, 10, 6, 5, 4, 10, 8, 6, 2, 9, 0],
#     ]
#     data['time_windows'] = [
#         (0, 5),  # depot
#         (7, 12),  # 1
#         (10, 15),  # 2
#         (16, 18),  # 3
#         (10, 13),  # 4
#         (0, 5),  # 5
#         (5, 10),  # 6
#         (0, 4),  # 7
#         (5, 10),  # 8
#         (0, 3),  # 9
#         (10, 16),  # 10
#         (10, 15),  # 11
#         (0, 5),  # 12
#         (5, 10),  # 13
#         (7, 8),  # 14
#         (10, 15),  # 15
#         (11, 15),  # 16
#     ]
#     data['num_vehicles'] = 4
#     data['depot'] = 0
#     return data
#    (0, 18000),  # depot
#        (25200, 43200),  # 1
#        (36000, 54000),  # 2
#        (57600, 64800),  # 3
#        (36000, 46800),  # 4
#        (0, 18000),  # 5
#        (18000, 36000),  # 6

# def create_data_model():
#     """Stores the data for the problem."""
#     data = {}
#     data['time_matrix'] = [
#         [0, 97, 325, 157, 140, 16, 2883],
#         [97, 0, 227, 59, 42, 81, 2981],
#         [325, 227, 0, 168, 185, 308, 3209],
#         [157, 59, 168, 0, 17, 140, 3041],
#         [140, 42, 185, 17, 0, 123, 3024],
#         [16, 81, 308, 140, 123, 0, 2900],
#         [2879, 2977, 3205, 3037, 3020, 2896, 0],
#     ]
#     data['time_windows'] = [
#         (0, 18000),  # depot
#         (25200, 43200),  # 1
#         (36000, 54000),  # 2
#         (57600, 64800),  # 3
#         (36000, 46800),  # 4
#         (0, 18000),  # 5
#         (18000, 36000),  # 6
#     ]
#     data['num_vehicles'] = 1
#     data['depot'] = 0
#     return data


def create_data_model1():
    """Stores the data for the problem."""
    data = {}
    data['time_matrix'] = [
        [0, 97, 325, 157, 140, 16, 2883],
        [97, 0, 227, 59, 42, 81, 2981],
        [325, 227, 0, 168, 185, 308, 3209],
        [157, 59, 168, 0, 17, 140, 3041],
        [140, 42, 185, 17, 0, 123, 3024],
        [16, 81, 308, 140, 123, 0, 2900],
        [2879, 2977, 3205, 3037, 3020, 2896, 0],
    ]
    data['time_windows'] = [
        (0, 5),  # depot
        (7, 12),  # 1
        (10, 13),  # 2
        (14, 18),  # 3
        (10, 13),  # 4
        (0, 5),  # 5
        (5, 10),  # 6
    ]
    data['num_vehicles'] = 1
    data['depot'] = 0
    return data


def create_data_model2():
    """Stores the data for the problem."""
    data = {}
    data['time_matrix'] = [
        [0.0, 147.9, 79.7, 88.3, 105.3, 229.1, 3051.4],
        [147.9, 0.0, 227.6, 59.6, 42.6, 81.2, 2903.5],
        [79.7, 227.6, 0.0, 168.0, 185.0, 308.8, 3131.1],
        [88.3, 59.6, 168.0, 0.0, 17.0, 140.8, 2963.1],
        [105.3, 42.6, 185.0, 17.0, 0.0, 123.8, 2946.1],
        [229.1, 81.2, 308.8, 140.8, 123.8, 0.0, 2822.3],
        [3047.4, 2899.5, 3127.1, 2959.1, 2942.1, 2818.3, 0.0]
    ]

    data['time_windows'] = [
        (0, 5),  # depot
        (7, 12),  # 1
        (10, 15),  # 2
        (15, 18),  # 3
        (10, 13),  # 4
        (0, 5),  # 5
        (5, 10),  # 6
    ]
    data['num_vehicles'] = 1
    data['depot'] = 0
    return data


def create_data_model():
    """Stores the data for the problem."""
    data = {}
    data['time_matrix'] = [
        [0, 0.03, 0.09, 0.04, 0.04, 0.004, 0.8],
        [0.03, 0, 0.06, 0.02, 0.01, 0.02, 0.83],
        [0.09, 0.06, 0, 0.05, 0.05, 0.09, 0.89],
        [0.04, 0.02, 0.05, 0, 0.005, 0.04, 0.84],
        [0.04, 0.01, 0.05, 0.005, 0, 0.03, 0.84],
        [0.004, 0.02, 0.09, 0.04, 0.03, 0, 0.81],
        [0.8, 0.83, 0.89, 0.84, 0.84, 0.81, 0],
    ]
    data['time_windows'] = [
        (0, 5),  # depot
        (7, 12),  # 1
        (10, 15),  # 2
        (15, 18),  # 3
        (10, 13),  # 4
        (0, 5),  # 5
        (5, 10),  # 6
    ]
    data['num_vehicles'] = 1
    data['depot'] = 0
    return data


def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    print(f'Objective: {solution.ObjectiveValue()}')
    time_dimension = routing.GetDimensionOrDie('Time')
    total_time = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        while not routing.IsEnd(index):
            time_var = time_dimension.CumulVar(index)
            plan_output += '{0} Time({1},{2}) -> '.format(
                manager.IndexToNode(index), solution.Min(time_var),
                solution.Max(time_var))
            index = solution.Value(routing.NextVar(index))
        time_var = time_dimension.CumulVar(index)
        plan_output += '{0} Time({1},{2})\n'.format(manager.IndexToNode(index),
                                                    solution.Min(time_var),
                                                    solution.Max(time_var))
        plan_output += 'Time of the route: {}min\n'.format(
            solution.Min(time_var))
        print(plan_output)
        total_time += solution.Min(time_var)
    print('Total time of all routes: {}min'.format(total_time))


def solve(data):
    """Solve the VRP with time windows."""
    # Instantiate the data problem. OK
    #data = create_data_model()

    # Create the routing index manager. OK+/-
    manager = pywrapcp.RoutingIndexManager(
        len(data['time_matrix']), data['num_vehicles'], data['depot'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.

    def time_callback(from_index, to_index):
        """Returns the travel time between the two nodes."""
        # Convert from routing variable Index to time matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['time_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(time_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Time Windows constraint.
    time = 'Time'
    routing.AddDimension(
        transit_callback_index,
        30,  # allow waiting time
        40,  # maximum time per vehicle
        False,  # Don't force start cumul to zero.
        time)
    time_dimension = routing.GetDimensionOrDie(time)
    # Add time window constraints for each location except depot.
    for location_idx, time_window in enumerate(data['time_windows']):
        if location_idx == data['depot']:
            continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetMin(time_window[0])
        time_dimension.CumulVar(index).SetMax(time_window[1])
        #time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])
    # Add time window constraints for each vehicle start node.
    depot_idx = data['depot']
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(
            data['time_windows'][depot_idx][0], data['time_windows'][depot_idx][1])

    # Instantiate route start and end times to produce feasible times.
    for i in range(data['num_vehicles']):
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.Start(i)))
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.End(i)))

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.time_limit.seconds = 1000

    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)
    # Print solution on console.
    if solution:
        print_solution(data, manager, routing, solution)
    else:
        print(routing.status())


# def main():

#     solve()


def main():

    locations = [
        Location(39.29233, -7.42635, (0, 2)),
        Location(39.29125, -7.43322, (0, 2)),
        Location(39.28711, -7.43164, (0, 2)),
        Location(39.28711, -7.43164, (0, 2)),
        Location(39.29055, -7.42497, (0, 2)),
        Location(39.30102, -7.43165, (0, 2)),
        Location(39.30012, -7.42633, (0, 2)),
        Location(39.31231, -7.44038, (0, 2)), 
        Location(39.32555, -7.41902, (0, 2)), 
        Location(39.32559, -7.41369, (0, 2)), 
        Location(39.31381, -7.41572, (0, 2)), 
        Location(39.30807, -7.40082, (0, 2)), 
        Location(39.29862, -7.39159, (0, 2)), 
        Location(39.27931, -7.42826, (0, 2)), 
        Location(39.29454, -7.43051, (0, 2)), 
        Location(39.29736, -7.40625, (0, 2)) 
    ]
 

    response = {'code': 'Ok', 
    'durations': [
        [0.0, 245.3, 258.4, 258.4, 49.6, 143.2, 30.1], 
        [245.3, 0.0, 13.1, 13.1, 294.9, 102.1, 275.4], 
        [258.4, 13.1, 0.0, 0.0, 308.0, 115.2, 288.5], 
        [258.4, 13.1, 0.0, 0.0, 308.0, 115.2, 288.5], 
        [49.6, 294.9, 308.0, 308.0, 0.0, 192.8, 19.5], 
        [143.2, 102.1, 115.2, 115.2, 192.8, 0.0, 173.3], 
        [30.1, 275.4, 288.5, 288.5, 19.5, 173.3, 0.0]], 
    'destinations': [{'distance': 64.249030873, 'name': '', 'location': [39.292908, -7.426418]}, {'distance': 47.52513235, 'name': '', 'location': [39.291545, -7.433533]}, {'distance': 516.869644609, 'name': '', 'location': [39.29126, -7.433804]}, {'distance': 516.869644609, 'name': '', 'location': [39.29126, -7.433804]}, {'distance': 273.556906363, 'name': '', 'location': [39.293028, -7.424961]}, {'distance': 955.242801173, 'name': '', 'location': [39.292422, -7.430677]}, {'distance': 779.993216156, 'name': '', 'location': [39.293099, -7.425539]}], 'sources': [{'distance': 64.249030873, 'name': '', 'location': [39.292908, -7.426418]}, {'distance': 47.52513235, 'name': '', 'location': [39.291545, -7.433533]}, {'distance': 516.869644609, 'name': '', 'location': [39.29126, -7.433804]}, {'distance': 516.869644609, 'name': '', 'location': [39.29126, -7.433804]}, {'distance': 273.556906363, 'name': '', 'location': [39.293028, -7.424961]}, {'distance': 955.242801173, 'name': '', 'location': [39.292422, -7.430677]}, {'distance': 779.993216156, 'name': '', 'location': [39.293099, -7.425539]}]}

    response = response['durations']

    data = {}
    data['time_matrix'] = time_matrix_sec_to_hour(response)
    data['time_windows'] = []
    for location in locations:
        data['time_windows'].append(location.timing)
    data['num_vehicles'] = 1
    data['depot'] = 0

    solve(data)

def get_time_matrix(locations):

    request_string = build_request_string(locations)
    response = requests.get(request_string)
    response = response['durations']

    return response


def build_request_string(locations):

    request_string = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving/'

    for location in locations:
        request_string += str(location.longitude) + \
            ',' + str(location.latitude)
        if location == locations[-1]:
            request_string += '?access_token=pk.eyJ1IjoibWlndWVsZnJ1dHVvc28iLCJhIjoiY2txdjljYWVpMDllNzJ6cDYzazg2dmhoZiJ9.2wSd1RH1bT_aKfCZaAdtVg'
        else:
            request_string += ';'

    return request_string



'''
    data1 = create_data_model1()

    data1['time_matrix'] = time_matrix_sec_to_hour(data1['time_matrix'])

    solve(data1)

    data2 = create_data_model2()

    data2['time_matrix'] = time_matrix_sec_to_hour(data2['time_matrix'])

    solve(data2)
'''


def time_matrix_sec_to_hour(time_matrix):

    for i in range(len(time_matrix)):
        for j in range(len(time_matrix[i])):
            time_matrix[i][j] = time_matrix[i][j] / 3600

    return time_matrix


if __name__ == '__main__':
    main()
